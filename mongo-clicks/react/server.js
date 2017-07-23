const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Require Click schema
const Click = require("./models/click");

// Create a new express app
const app = express();
// Set initial port
const PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration
mongoose.connect("mongodb://localhost/reduxClicks");
const db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// GET route to Retrieve click data from DB
app.get("/api", function(req, res) {

  // Find the latest clickCount
  Click.find({}).exec(function(err, doc) {

    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// POST route saves data sent when "click" or "reset" button is pressed.
app.post("/api", function(req, res) {

  let clickID = req.body.clickID;
  let clicks = parseInt(req.body.clicks);

  // Find the first matching document in the Click collection
  Click.findOneAndUpdate({
    clickID: clickID
  }, {
    $set: {
      clicks: clicks
    }
    // `upsert:true` creates new document if mongo can't find matching document
  }, { upsert: true }).exec(function(err) {

    if (err) {
      console.log(err);
    }
    else {
      res.send("Updated Click Count!");
    }
  });
});

// -------------------------------------------------

//Start server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
