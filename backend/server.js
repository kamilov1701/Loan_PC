const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

// DB CONNECTION
const db = mysql.createConnection({
    host: "localhost:5173",
    user: "root",
    password: "12345678", // your mysql password
    database: "Loan_PC",
});

// TEST
app.get("/", (req, res) => {
    res.send("API Working ✅");
});

app.listen(5000, () => console.log("Server running on port 5000"));