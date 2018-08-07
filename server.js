const port = process.env.PORT || 3000;

const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

//register hbs for using partials
hbs.registerPartials(__dirname + "/views/partials");

//register hbs helper functions
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIT", text => {
  return text.toUpperCase();
});

//set handlerbar (hbs) engine setting for template
app.set("view engine", "html");
app.engine("html", hbs.__express);

//express to call the static html page//
app.use(express.static(__dirname + "/public"));

//Middleware function to log the req and res
app.use((req, res, next) => {
  var now = new Date().toString();
  var logMsg = now + ": " + req.method + " " + req.url;
  console.log(logMsg);
  fs.appendFile("server.log", logMsg + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log.");
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render("maintenance.html");
});

app.get("/", (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //     name: "Manohar Kurapati",
  //     likes: ["Coding", "Movies"]
  // });

  res.render("home.html", {
    pageTitle: "WELCOME to Home Page",
    welcomeMessage: "This is the home page of Node JS Home Tutorial."
  });
});

app.get("/about", (req, res) => {
  // res.send("<h1>About Page!</h1>");
  res.render("about.html", {
    pageTitle: "About Page - Header passed",
    welcomeMessage: "This is the About page of the website."
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMsg: "Error page - Data not found",
    errorCode: 501
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
