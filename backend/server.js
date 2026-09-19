const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors({
    origin: "https://neskipu.github.io"
}));

app.use(express.json());


const pool = new Pool({
   connectionString: process.env.DATABASE_URL,

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
        const { name, email, phone, message } = req.body;

       const result = await pool.query(
    `INSERT INTO contacts (name, email, phone, message)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, phone, message]
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

app.listen(PORT, "0.0.0.0", () => {
    console.log(`KJCF backend running on port ${PORT}`);
});