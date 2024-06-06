const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { auth } = require("express-openid-connect");

const PORT = 8080;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: "http://localhost:80",
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/generate/embedding", async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const text = "The quick brown fox jumps over the lazy dog.";
  const result = await model.embedContent(text);
  const embedding = result.embedding;
  res.json({ embedding: embedding.values });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
