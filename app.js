const express = require('express'); // declaring express dependency
// initialize express
const app = express(); // create an app which is an instance of the express object
const port = 3003; // declaring port in a variable so that we can use anywhere on this page
const middleware = require('./middleware')


const server = app.listen(port, () => console.log("Server listening on port " + port)); // create server instance


app.set("view engine", "pug"); // template engine
app.set("views", "views"); // go to folder views for template

// Routes
const loginRoute = require('./routes/loginRoutes');
app.use("/login", loginRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
    
    var payload = { // term used to refer to the data we're sending to a function, page, etc.
        pageTitle: "Home"
    }

    res.status(200).render("home", payload);
})