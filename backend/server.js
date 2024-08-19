require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { verifyToken } = require("./authMiddleware");
const { parsePDFText } = require("./utils/pdfParser");

const PORT = 8080;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" })); // Increase the payload size limit
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.post("/api/receivePDF", verifyToken, async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileStats = fs.statSync(filePath);
    const fileSizeInBytes = fileStats.size;
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
    const userId = req.query.userId;

    if (fileSizeInBytes > maxSizeInBytes) {
      fs.unlinkSync(filePath);
      return res.status(400).send('File size exceeds 5MB');
    }

    const textContent = await parsePDFText(filePath);

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

    // Combine the embeddings
    const embeddings = result.embeddings.flatMap(embedding => embedding.values);

    // Clean up the uploaded file after processing
    fs.unlinkSync(filePath);

    res.json({ embeddings });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error processing file');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});