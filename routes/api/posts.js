const express = require('express'); // declaring express dependency
const app = express(); // create an app which is an instance of the express object
const router = express.Router();
const bodyParser = require("body-parser"); // need this to use req.body below... to get data from the body(line 17)
const User = require('../../schemas/UserSchema');
const Post = require('../../schemas/PostSchema');

app.use(bodyParser.urlencoded({ extended: false }));

// getting the posts and listing them
router.get("/", (req, res, next) => {
    Post.find()
    .populate("postedBy")
    .sort({ "createdAt": -1 }) // makes sure newest posts add on top of feed list
    .then(results => res.status(200).send(results)) // send result back to user
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
})

router.post("/", async (req, res, next) => {
    if (!req.body.content) { // check to see if there is content. This line is saying, if no content
        console.log("Content param not sent with request");
        return res.sendStatus(400);
    }

    var postData = {
        content: req.body.content,
        postedBy: req.session.user
    }
    // create a new post
    Post.create(postData)
    .then(async newPost => {
        newPost = await User.populate(newPost, {path: "postedBy"});

        res.status(201).send(newPost);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
})

router.post("/", async (req, res, next) => {
})

router.put("/:id/like", async (req, res, next) => {

    var postId = req.params.id;
    var userId = req.session.user._id;

    var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

    var option = isLiked ? "$pull" : "$addToSet";

    // Insert user like
    req.session.user = await User.findByIdAndUpdate(userId, { [option]: { likes: postId } }, { new: true })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    // Insert post like
   var post = await Post.findByIdAndUpdate(postId, { [option]: { likes: userId } }, { new: true })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    res.status(200).send(post);
})

router.post("/:id/retweet", async (req, res, next) => {
    
    return res.status(200).send("yee haw")

    var postId = req.params.id;
    var userId = req.session.user._id;

    var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

    var option = isLiked ? "$pull" : "$addToSet";

    // Insert user like
    req.session.user = await User.findByIdAndUpdate(userId, { [option]: { likes: postId } }, { new: true })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    // Insert post like
   var post = await Post.findByIdAndUpdate(postId, { [option]: { likes: userId } }, { new: true })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    res.status(200).send(post);
})

module.exports = router;