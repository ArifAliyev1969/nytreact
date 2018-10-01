const express = require("express"); // Server
const bodyParser = require("body-parser"); // JSON Middleware
const logger = require("morgan"); // REST Logger
const mongoose = require("mongoose"); // MongoDB ORM
const routes = require("./routes");
let db = require("./models"); // Require all models

let PORT = process.env.PORT || 8080;
let mongooseConnection = mongoose.connection;

let app = express();

mongoose.Promise = global.Promise; // Set up promises with mongoose

mongoose.connect(
  // Connect to the Mongo DB
  process.env.MONGODB_URI ||
    "mongodb://arif:rabota15@ds119273.mlab.com:19273/nytreact"
);

mongooseConnection.on(
  "error",
  console.error.bind(console, "connection error:")
);

mongooseConnection.once("open", function() {
  console.log(`Sucessfully Connected to Mongo DB !`); // If Connection is successful, Console.log(Message)
});

var cors = require("cors");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());

app.post("/saveArticle", function(req, res) {
  console.log("back path hit");
  db.Article.create(req.body).then(lol => console.log(lol));
});

app.use(routes); // Add routes, both API and View

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
