var express = require("express");
var app = express();
var server = require("http").createServer(app);
const open = require("open");

app.use(express.static(__dirname + "/"));

app.get("/", function(request, response) {
  console.log(request);
  console.log(response);
  response.sendFile(path.join(__dirname, "./", "./index.html"));
});

server.listen(3000, async function() {
  console.log("Pop in a box eCommerce shop is running on 3000");
  await open("http://localhost:3000/", { app: "google chrome" });
});

module.exports = server;
