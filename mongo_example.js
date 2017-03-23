"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  //If connection to "test-tweets" db is successful...
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  //All program logic that needs the connection should be invoked within here

  //Get all the tweets. "find" them.
  // db.collection("tweets").find({}, (err, results) => {
  //   if (err) throw err;
  //
  //   //iterate on the cursor to get results one at a time
  //   // console.log("for each item yielded by the cursor:");
  //   // results.each((err, item) => console.log(" ", item));
  //
  //   //or instead, slurp the items into an array
  //   // results.toArray((err, resultsArray) => {
  //   //   if (err) throw err;
  //   //
  //   //   console.log("results.toArray:", resultsArray);
  //   // });
  //
  //   //Close the connection at the end
  //   db.close();
  // });

  //or instead, just get the results as an array all at once
  db.collection("tweets").find().toArray((err, results) => {
    if (err) throw err;

    console.log("results array: ", results);

    db.close();
  })
});
