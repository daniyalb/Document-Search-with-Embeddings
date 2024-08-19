require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
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

// Set up multer for file storage
const upload = multer({ dest: 'uploads/' });

app.post("/api/receivePDF", verifyToken, upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const textContent = await parsePDFText(filePath);

    // Assuming you have a function to generate embeddings from text
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(textContent);
    const embedding = result.embedding;

    // Clean up the uploaded file after processing
    fs.unlinkSync(filePath);

    res.json({ embedding: embedding.values });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error processing file');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});