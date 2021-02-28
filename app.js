const express = require('express'); // declaring express dependency
// initialize express
const app = express(); // create an app which is an instance of the express object
const port = 3003; // declaring port in a variable so that we can use anywhere on this page
const middleware = require('./middleware')
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('./database'); 
const session = require('express-session'); 

const server = app.listen(port, () => console.log("Server listening on port " + port)); // create server instance


app.set("view engine", "pug"); // template engine
app.set("views", "views"); // go to folder views for template

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public"))); // to specify that anything inside of the public is to be served as a static file (static files mean that it can be accessed directly. *Try typing into url: localhost:3003/css/login.css ) 

app.use(session({ // creating a new instance of session and passing in options in curly brackets
    secret: "banana milk",
    resave: true, // forces the session to be saved even when the session wasn't modified during the server's request
    saveUninitialized: false 
}))

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logoutRoutes');

// Api routes
const postsApiRoute = require('./routes/api/posts');

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);

app.use("/api/posts", postsApiRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
    
    var payload = { // term used to refer to the data we're sending to a function, page, etc.
        pageTitle: "Home",
        userLoggedIn: req.session.user, // will give us information about the user logged in
        userLoggedInJs: JSON.stringify(req.session.user)
    }

    res.status(200).render("home", payload);
})