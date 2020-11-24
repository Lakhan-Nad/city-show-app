require("dotenv").config();

const http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const server = http.createServer(app);

app.use("/", express.static(path.join(__dirname, "public")));


app.use("/",(req,res)=>{
    res.sendFile(path.join(__dirname, path.join("public", "index.html")));
})

const port = process.env.port || 3000;
server.listen(port, () => {
    console.log(`Server Listening on port: ${port}`);
});