const express = require('express'); // declaring express dependency
const app = express(); // create an app which is an instance of the express object
const router = express.Router();
const bodyParser = require("body-parser"); // need this to use req.body below... to get data from the body(line 17)
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');


app.set("view engine", "pug"); // template engine
app.set("views", "views"); // go to folder views for template

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    res.status(200).render("login");
})

router.post("/", async (req, res, next) => {

    var payload = req.body;

    if(req.body.logUsername && req.body.logPassword) {
        var user = await User.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logUsername }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("login", payload);
        });
        // checking if passwords match
        if(user != null) {
            var result = await bcrypt.compare(req.body.logPassword, user.password)

            if(result === true) { // if it gets here, it means passwords matched!
                req.session.user = user; // set the session
                return res.redirect("/"); // send them to home page
            }
        }
        payload.errorMessage = "Login credentials incorrect.";
        return res.status(200).render("login", payload);
    }
    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render("login");
})

module.exports = router;