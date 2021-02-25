const express = require('express'); // declaring express dependency
const app = express(); // create an app which is an instance of the express object
const router = express.Router();
const bodyParser = require("body-parser"); // need this to use req.body below... to get data from the body(line 17)
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    if(req.session) {
        req.session.destroy(() => {
            res.redirect("/login");
        })
    }
})


module.exports = router;