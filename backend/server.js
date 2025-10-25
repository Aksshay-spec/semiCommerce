const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const PRODUCTS_FILE = path.join(__dirname, "products.json");

// ✅ Get all products
app.get("/api/products", (req, res) => {
  fs.readFile(PRODUCTS_FILE, "utf8", (err, data) => {
    if (err)
      return res.status(500).json({ error: "Failed to read products file" });
    const products = JSON.parse(data);
    res.json(products);
  });
});

// ✅ Add new product
// ✅ Add new product
app.post("/api/products", (req, res) => {
  const newProduct = req.body;

  fs.readFile(PRODUCTS_FILE, "utf8", (err, data) => {
    if (err)
      return res.status(500).json({ error: "Failed to read products file" });

    let products = [];
    try {
      products = data ? JSON.parse(data) : [];
    } catch (e) {
      return res.status(500).json({ error: "Invalid products.json format" });
    }

    // assign unique id
    newProduct.id = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;

    // add the new product
    products.push(newProduct);

    // write back to file
    fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to save product" });

      res.json({ message: "Product added", product: newProduct });
    });
  });
});

// ✅ Contact admin (send email)
app.post("/api/contact", async (req, res) => {
  const { productName, userEmail, message } = req.body;

  // Setup Nodemailer (use Gmail or any SMTP server)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "YOUR_EMAIL@gmail.com", // admin email
      pass: "YOUR_EMAIL_PASSWORD", // app password recommended
    },
  });

  const mailOptions = {
    from: userEmail,
    to: "YOUR_EMAIL@gmail.com",
    subject: `Interest in ${productName}`,
    text: message || `User ${userEmail} is interested in ${productName}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
