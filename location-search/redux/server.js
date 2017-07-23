const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Require Click schema
const History = require("./models/history");

// Create a new express app
const app = express();
// Sets an initial port
const PORT = process.env.PORT || 8080;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration
mongoose.connect("mongodb://localhost/addressdb");
const db = mongoose.connection;

db.on("error", function (err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function () {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. Redirects to rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// GET route retrieves recent history from DB
app.get("/api", function(req, res) {

  // Find all documents from History collection
  History.find({}).sort([
    ["date", "descending"]
  ]).limit(5).exec(function (err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// POST route saves location to DB
app.post("/api", function(req, res) {

  let location = req.body.location;

  console.log("posting!");
  
  History.create({
    location: location,
    date: Date.now()
  }, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  });
});

// -------------------------------------------------

// Start server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
