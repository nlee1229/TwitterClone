const express = require('express'); // declaring express dependency
const app = express(); // create an app which is an instance of the express object
const router = express.Router();

app.set("view engine", "pug"); // template engine
app.set("views", "views"); // go to folder views for template

router.get("/", (req, res, next) => {
    res.status(200).render("login");
})

module.exports = router;