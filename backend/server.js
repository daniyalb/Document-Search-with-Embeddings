const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const PORT = 8080;
const SECRET_KEY = 'secret key';
// const SECRET_KEY = process.env.JWT_SECRET_KEY;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
    user: process.env.DATABASE_USERNAME,
    host: 'database',
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
    });

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).send();
    } catch (error) {
        res.status(400).send();
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
        return res.status(400).send({ message: 'User not found' });
    }
    const user = result.rows[0];
    if (result.rows.length === 0) return res.status(400).send();
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username }, SECRET);
        res.status(200).send({ token });
    } else {
        res.status(400).send();
    }
});

app.get('/api/validate', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    res.json({ user: decoded });
  });
});

app.get('/api/generate/embedding', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "embedding-001"});

    const text = "The quick brown fox jumps over the lazy dog."

    const result = await model.embedContent(text);
    const embedding = result.embedding;
    console.log(embedding.values);

    res.json({ embedding: embedding.values });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});