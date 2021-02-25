const express = require('express'); // declaring express dependency
// initialize express
const app = express(); // create an app which is an instance of the express object
const port = 3003; // declaring port in a variable so that we can use anywhere on this page
const middleware = require('./middleware')
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('./database'); 

const server = app.listen(port, () => console.log("Server listening on port " + port)); // create server instance


app.set("view engine", "pug"); // template engine
app.set("views", "views"); // go to folder views for template

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public"))); // to specify that anything inside of the public is to be served as a static file (static files mean that it can be accessed directly. *Try typing into url: localhost:3003/css/login.css ) 

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
    
    var payload = { // term used to refer to the data we're sending to a function, page, etc.
        pageTitle: "Home"
    }

    res.status(200).render("home", payload);
})