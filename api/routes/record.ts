import express from "express";

var session = require('express-session');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
recordRoutes.use(session({secret:'4982094'}));


// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

export let myobj: any;
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (request: any, response: any) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err: any, result: any) {
      if (err) throw err;
      response.json(result);
    });
});

recordRoutes.route("/test").get(function (request: any, response: any) {
    response.send('hello');
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req: any, res: any) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("records")
      .findOne(myquery, function (err: any, result: any) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/create").post(function (req: any, response: any) {
  let db_connect = dbo.getDb();
   myobj = {
    student_name: req.body.student_name,
    student_id: req.body.student_id,
    student_grade: req.body.student_grade,
    student_email: req.body.student_email,
    student_phone: req.body.student_phone,
  };
  db_connect.collection("records").insertOne(myobj, function (err: any, res: any) {
    if (err) throw err;
    response.json(res);
  });
  //response.redirect('/pkpasses/'+ myobj.student_id);
});


// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req: any, response: any) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
        student_name: req.body.student_name,
        student_id: req.body.student_id,
        student_grade: req.body.student_grade,
        student_email: req.body.student_email,
        student_phone: req.body.student_phone,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err: any, res: any) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("delete/:id").get((request: any, response: any) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( request.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err: any, obj: any) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});



recordRoutes.get('/sesstest', function(req: any, res: any) {
  if(req.session.page_views){
     req.session.page_views++;
     res.send("You visited this page " + req.session.page_views + " times");
  } else {
     req.session.page_views = 1;
     res.send("Welcome to this page for the first time!");
  }
});

export {
    recordRoutes
}

