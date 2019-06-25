// Stuff needs including!  (Cheerio is included elsewhere in this project.)
const bodyParser = require("body-parser");
const express = require("express");
const exbar = require("express-handlebars");
const mongoose = require("mongoose");

// Because routing is good for this application!
const routes = require("./routes");

// Prefer the deployed environment's database link, but use the local host's Mongo database for development purposes.
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";



// We need a separate connection to the Mongo database.
mongoose.connect(MONGODB_URI);

// Port authority:  Use the environment's default OR the sorta default of 8080!
const PORT = process.env.PORT || 8080;

// Do a thing with Express by calling it the 'app' variable.
const app = express();

// Do a thing with Express to make the "public" directory static.  This is standard operating procedure with Express.
// https://expressjs.com/en/starter/static-files.html has more info on static files in Express.
app.use(express.static("public"));

// Handle the bars.  Check the main.handlebars file in ./views/layouts for more details.  Again, this is standard operating procedure!
app.engine("handlebars", exbar({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Since using BodyParser is faster than writing it, let's use BodyParser in our app!  More SOP.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express handles this program's routes.
app.use(routes);

// Our server is accessed via this port.
app.listen(PORT, function()
{
  console.log("Listening on port " + PORT + "!");
});