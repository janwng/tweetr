"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      // simulateDelay(() => {
      //   db.tweets.push(newTweet);
        // callback(null, true);
      // });
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    }, //saveTweet function ends here

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweets').find().toArray((err, results) => {
        if (err) throw err;
        console.log(results);
        callback(null, results);
        //db.close();
      });
    }
  }
}
