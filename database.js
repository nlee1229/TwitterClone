const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true); 
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false); // associated with find one and update. Prevents a warning in terminal.Calls a function in MongoDB that is no longer supported. Now it is supported with this line

class Database {

    constructor() { // first thing that run in this class
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://admin:pw123@twitterclonecluster.c8ppf.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority")
        .then(() => {
            console.log("Database connection established");
        })
        .catch((err) => {
            console.log("Database connection error" + err);
        })
    }
}

module.exports = new Database(); 