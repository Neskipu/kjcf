const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get("/", (req, res) => {
    res.json({
        message: "KJCF backend is running!"
    });
});

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "PostgreSQL connection successful!",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database connection failed."
        });
    }
});

app.post("/api/contacts", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const result = await pool.query(
            `INSERT INTO contacts (name, email, message)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, email, message]
        );

        res.status(201).json({
            message: "Contact submitted successfully!",
            contact: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to submit contact."
        });
    }
});

app.listen(PORT, () => {
    console.log(`KJCF backend running at http://localhost:${PORT}`);
});