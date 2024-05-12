const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crud",
  default_authentication_plugin: "mysql_native_password",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    throw err;
  }
  console.log("Database connected!");
});

// Define routes

// GET all students
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }
    return res.json(data);
  });
});

// POST create a student
app.post("/create", (req, res) => {
  const { name, email, phoneNumber, dob } = req.body;
  const sql = "INSERT INTO student (Name, Email, PhoneNumber, DOB) VALUES (?, ?, ?, ?)";
  const values = [name, email, phoneNumber, dob];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }
    return res.json(data);
  });
});

// PUT update a student
app.put("/update/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, email, phoneNumber, dob } = req.body;
  if (!name || !email || !phoneNumber || !dob) {
    return res.status(400).json({ error: "Name, email, phone number, and date of birth are required" });
  }
  const sql = "UPDATE student SET Name = ?, Email = ?, PhoneNumber = ?, DOB = ? WHERE ID = ?";
  const values = [name, email, phoneNumber, dob, id];
  db.query(sql, values, (err, data) => {
    if (err) {
      return next(err);
    }
    return res.json(data);
  });
});

// DELETE a student
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student WHERE ID = ?";
  db.query(sql, id, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }
    return res.json(data);
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
