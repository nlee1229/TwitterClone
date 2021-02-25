const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {

    res.status(200).render("register");
})

router.post("/", async (req, res, next) => {

    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;

    if(firstName && lastName && username && email && password) {
        var user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("register", payload);
        });

        if(user == null) {
            // No user found
            var data = req.body;
            data.password = await bcrypt.hash(password, 10);

            User.create(data)
            .then((user) => {
                req.session.user = user;
                return res.redirect("/");
            })
        }
        else {
            // User found
            if (email == user.email) {
                payload.errorMessage = "Email already in use.";
            }
            else {
                payload.errorMessage = "Username already in use.";
            }
            res.status(200).render("register", payload);
        }
        
        

    }
    else {
        payload.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("register", payload);
    }
})

module.exports = router;






// const express = require('express'); // declaring express dependency
// const app = express(); // create an app which is an instance of the express object
// const router = express.Router();
// const bodyParser = require('body-parser');
// const User = require('../schemas/UserSchema'); // need this to use UserSchema model we made
// const bcrypt = require('bcrypt'); // hash passwords

// app.set("view engine", "pug"); // template engine
// app.set("views", "views"); // go to folder views for template

// app.use(bodyParser.urlencoded({extended: false}));

// router.get("/", (req, res, next) => {
//     res.status(200).render("register");
// })

// router.post("/", async (req, res, next) => {

//     var firstName = req.body.firstName.trim();
//     var lastName = req.body.lastName.trim();
//     var username = req.body.username.trim();
//     var email = req.body.email.trim();
//     var password = req.body.password;

//     var payload = req.body; // contain all values user previously entered. Will fill in values they last used to save time for them
 
//     if(firstName && lastName && username && email && password) {  // if check to see if these fields have actual values in it
//         // check if the user is already in the db
//         var user = await User.findOne({
//             $or: [ // the or means that it will look for any rows that have username & email
//                 {username: userssname},
//                 {email: email}
//             ]
//         })
//         .catch((error) => {
//             console.log(error);
//             payload.errorMessage = "Something went wrong."
//             res.status(200).render("register", payload);
//         });

//         // checking if result(user) was found
//         if(user == null) {
//             // no user found
//             var data = req.body;
//             data.password = await bcrypt.hash(password, 10); // encrypt pw. 10 is saltRounds, which is how many times is hashes. More=more secure 

//             User.create(data)
//             .then((user) => {
//                 req.session.user = user; // storing the newly created now logged in user in session
//                 return res.redirect("/");
//             })
//         }
//         else {
//             // user found
//             if (email == user.email) {
//                 payload.errorMessage = "Email already in use."
//             }
//             else {
//                 payload.errorMessage = "Username already in use."
//             }
//             res.status(200).render("register", payload);
//         }
//     } 
//     else {
//         payload.errorMessage = "Make sure each field has a valid value."
//         res.status(200).render("register", payload);
//     }
    
//     res.status(200).render("register");
// })

// module.exports = router;