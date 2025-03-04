const express = require("express");
const router = express.Router();
const db = require("../db");

// Welcome Page
router.get("/", (req, res) => {
    res.send(`
        <center>
        <h1>Welcome to Store</h1>
        </center>
    `);
});

// View Products
router.get("/view", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) return res.json({ error: err.message });
        res.json(result);
    });
});

// Add Product
router.post("/", (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).send("All Details are Required");
    }

    const query = "INSERT INTO products (name, price) VALUES (?, ?)";
    db.query(query, [name, price], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(`${name} (₹${price}) Added Successfully`);
    });
});

// Delete Product
router.delete("/:name", (req, res) => {
    const prdname = req.params.name;

    db.query("SELECT * FROM products WHERE name = ?", [prdname], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.length === 0) {
            return res.status(404).send("Item Not Found");
        }

        db.query("DELETE FROM products WHERE name = ?", [prdname], (err, deleteresult) => {
            if (err) return res.status(500).json({ error: err.message });

            res.send(`Product Deleted: ${prdname}`);
        });
    });
});

module.exports = router;
