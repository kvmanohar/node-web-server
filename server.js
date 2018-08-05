const express = require("express");
const hbs = require('hbs');

var app = express();

//register hbs for using partials
hbs.registerPartials(__dirname + '/views/partials');

//set handlerbar (hbs) engine setting for template
app.set('view engine', 'html');
app.engine('html', hbs.__express);

//express to call the static html page//
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: "Manohar Kurapati",
    //     likes: ["Coding", "Movies"]
    // });

    res.render('home.html', {
        pageTitle: 'WELCOME to Home Page',
        welcomeMessage: 'This is the home page of Node JS Home Tutorial.',
        currentYear: new Date().getFullYear()
    });
});

app.get("/about", (req, res) => {
    // res.send("<h1>About Page!</h1>");
    res.render('about.html', {
        pageTitle: 'About Page - Header passed',
        welcomeMessage: 'This is the About page of the website.',
        currentYear: new Date().getFullYear()
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMsg: "Error page - Data not found",
        errorCode: 501
    });
});
app.listen(8000, () => {
    console.log("Server is up on port 8000");
});