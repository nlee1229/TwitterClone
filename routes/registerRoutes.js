const express = require('express'); // declaring express dependency
const app = express(); // create an app which is an instance of the express object
const router = express.Router();
const bodyParser = require('body-parser');

app.set("view engine", "pug"); // template engine
app.set("views", "views"); // go to folder views for template

app.use(bodyParser.urlencoded({extended: false}));

router.get("/", (req, res, next) => {
    res.status(200).render("register");
})

router.post("/", (req, res, next) => {
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body; // contain all values user previously entered. Will fill in values they last used to save time for them

    if(firstName && lastName && username && email && password) {  // if check to see if these fields have actual values in it

    } 
    else {
        payload.errorMessage = "Make sure each field has a valid value."
        res.status(200).render("register", payload);
    }
    
    res.status(200).render("register");
})

module.exports = router;