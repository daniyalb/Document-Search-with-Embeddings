require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { verifyToken } = require("./authMiddleware");
const { parsePDFText } = require("./utils/pdfParser");
const { Pool } = require("pg");

const PORT = 8080;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" })); // Increase the payload size limit
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

// Set up multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Set up PostgreSQL connection
const pool = new Pool({
  // user: process.env.DATABASE_USERNAME,
  host: "localhost",
  database: "postgres",
  // password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

app.post(
  "/api/receivePDF",
  verifyToken,
  upload.single("file"),
  async (req, res) => {
    try {
      const fileBuffer = req.file.buffer;
      const fileSizeInBytes = fileBuffer.length;
      const maxSizeInBytes = 2.5 * 1024 * 1024; // 2.5MB in bytes
      const userId = req.user.id;

      if (fileSizeInBytes > maxSizeInBytes) {
        return res.status(400).send("File size exceeds 2.5MB");
      }

      const textContent = await parsePDFText(fileBuffer);

      // Split the text content into smaller chunks
      const maxSize = 10000; // 10,000 bytes
      const chunks = [];
      for (let i = 0; i < textContent.length; i += maxSize) {
        chunks.push(textContent.substring(i, i + maxSize));
      }

      // Function to convert text to request format
      function textToRequest(text) {
        return { content: { role: "user", parts: [{ text }] } };
      }

      // Batch embed the contents
      const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
      const result = await model.batchEmbedContents({
        requests: chunks.map(textToRequest),
      });

      // Get the embeddings
      const embeddings = result.embeddings.map((embedding) => embedding.values);

      // make the array a string, like "[1,2,3]"
      const formattedEmbeddings = embeddings.map((embedding) => {
        return `[${embedding.join(",")}]`;
      });

      // Store the embeddings in the database
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const insertDocumentQuery =
          "INSERT INTO documents (user_id, title) VALUES ($1, $2) RETURNING id";
        const documentResult = await client.query(insertDocumentQuery, [
          userId,
          req.query.fileName,
        ]);
        const documentId = documentResult.rows[0].id;

        const insertEmbeddingQuery =
          "INSERT INTO embeddings (embedding, document_id) VALUES ($1, $2)";
        for (const embedding of formattedEmbeddings) {
          await client.query(insertEmbeddingQuery, [embedding, documentId]);
        }

        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }

      res.json({ embeddings });
    } catch (error) {
      console.error("Error processing file:", error);
      res.status(500).send("Error processing file");
    }
  }
);

app.post("/api/makeQuery", verifyToken, async (req, res) => {
  const prompt = req.body.prompt;
  const userId = req.user.id;

  // if the prompt is larger than 10,000 bytes, return an error
  if (Buffer.byteLength(prompt, "utf8") > 9950) {
    return res.status(400).send("Prompt is too long, please shorten it.");
  }

  try {

    // Batch embed the contents
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(prompt);

    // Get the embedding
    const embedding = result.embedding.values;
    const formattedEmbedding = `[${embedding.join(",")}]`;

    //get closest embeddings from the database using l2 distance
    // SELECT * FROM items ORDER BY embedding <-> '[3,1,2]' LIMIT 5; <- Example query
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      
      // Find the document Ids that have the closest l2 distance to the prompt
      // compare the embedding with all the embeddings of a document,
      // return the ids of the documents with the smallest l2 distance
      // make sure the user_id is the same as the user_id of the prompt
      const findClosestEmbeddingsQuery =
        "SELECT document_id FROM embeddings WHERE document_id IN (SELECT id FROM documents WHERE user_id = $1) ORDER BY embedding <-> $2 LIMIT 5";
      const result = await client.query(findClosestEmbeddingsQuery, [userId, formattedEmbedding]);

      // get the titles of the documents in the same order as the result
      const titles = [];
      for (const row of result.rows) {
        const titleQuery = "SELECT title FROM documents WHERE id = $1";
        const titleResult = await client.query(titleQuery, [row.document_id]);
        titles.push(titleResult.rows[0].title);
      }

      await client.query("COMMIT");
      res.json({ titles });
    }
    catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error processing prompt:", error);
    res.status(500).send("Error processing prompt");
  }
});

app.get("/api/getDocuments", verifyToken, async (req, res) => {
  const userId = req.user.id;

  const client = await pool.connect();
  try {
    const query = "SELECT id, title FROM documents WHERE user_id = $1";
    const result = await client.query(query, [userId]);
    res.json({ documents: result.rows });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send("Error fetching documents");
  } finally {
    client.release();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
