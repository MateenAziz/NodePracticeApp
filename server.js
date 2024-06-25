const http = require('http');
const express = require('express');
const router = require("./router/admin");
const parser = require("body-parser");
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(router);
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})

app.listen(3000);