var express = require("express");
var app = express();
var server = require("http").createServer(app);
const open = require("open");

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/"));
app.use(express.static(__dirname + "assets/images"));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "./", "./index.html"));
});

server.listen(3000, async () => {
  console.log(`Pop in a box eCommerce shop is running on ${port}`);
  await open(`http://localhost:${port}/`, { app: "google chrome" });
});

module.exports = server;
