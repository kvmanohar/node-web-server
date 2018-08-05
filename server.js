const express = require("express");
const hbs = require('hbs');

var app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: "Manohar Kurapati",
    //     likes: ["Coding", "Movies"]
    // });

    res.render('home.html', {
        pageTitle: 'WELCOME to Home Page',
        bodyMessage: 'This is the home page of Node JS Home Tutorial '
    });
});

app.get("/about", (req, res) => {
    // res.send("<h1>About Page!</h1>");
    res.render('about.html', {
        pageTitle: 'About Page - Header passed',
        currentYear: new Date().getFullYear()
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMsg: "Error page - Data not found",
        errorCode: 501
    });
});
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});