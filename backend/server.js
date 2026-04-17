require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/loans", require("./routes/loanRoutes"));

app.get("/", (req, res) => {
    res.send("API running...");
});

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);