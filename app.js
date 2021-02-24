const express = require('express'); // declaring express dependency
// initialize express
const app = express(); // create an app which is an instance of the express object
const port = 3003; // declaring port in a variable so that we can use anywhere on this page


const server = app.listen(port, () => console.log("Server listening on port " + port)); // create server instance

app.get("/", (req, res, next) => {
    res.status(200).send("Yahoo!");
})