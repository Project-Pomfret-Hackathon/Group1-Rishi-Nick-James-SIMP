//conn.ts
//Created by @collinsrs on March 7, 2022.
//Code used from a previous project by me
//Initially guided by Mongo's MERN tutorial  
// https://github.com/collinsrs/DigitalServer-Pomfret/blob/main/db/conn.ts
// https://www.mongodb.com/languages/mern-stack-tutorial

const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db: any;
 
module.exports = {
  connectToServer: function (callback: any) {
    client.connect(function (err: any, db: any) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("myFirstDatabase");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};
