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
      const userId = req.query.userId;

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
