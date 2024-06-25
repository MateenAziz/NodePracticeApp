const express = require("express");
const path = require("path");


const router = express.Router();
router.get('/', (req, res) =>{

    res.sendFile(path.join(__dirname, "../", "views", "index.html"));
});

router.post('/add-product', (req, res) =>{
    console.log(req.body);
    res.sendFile(path.join(__dirname, "../", "views", "index.html"));
});

module.exports = router;