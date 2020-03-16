require("dotenv").config();
const express = require("express");
const { connectToDb } = require("./db.js");
const { installHandler } = require('./api_handler.js');
const imagesApi = require("./routes/images");

const app = express();


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use("/api/images", imagesApi);

installHandler(app);

const port = process.env.API_SERVER_PORT || 3000;

(async () => {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`🚀 Api server started on port ${port}`);
    });
  } catch (err) {
    console.log("ERROR FROM SCRIPTS: ", err);
  }
})();

// const fs = require('fs');
// require('dotenv').config();
// const express = require('express');
// const { ApolloServer, UserInputError } = require('apollo-server-express');
// const { GraphQLScalarType } = require('graphql');
// const { Kind } = require('graphql/language');
// const { MongoClient } = require('mongodb');
// const imagesApi = require("./routes/images");

// const url = process.env.DB_URL || "mongodb+srv://spotshare:shareaspot01@cluster0-wg2gb.mongodb.net/test";

// let db;

// let aboutMessage = "This is the about message";

// const GraphQLDate = new GraphQLScalarType({
//   name: 'GraphQLDate',
//   description: 'A Date() type in GraphQL as a scalar',
//   serialize(value) {
//     return value.toISOString();
//   },
//   parseValue(value) {
//     const dateValue = new Date(value);
//     return isNaN(dateValue) ? undefined : dateValue;
//   },
//   parseLiteral(ast) {
//     if (ast.kind == Kind.STRING) {
//       const value = new Date(ast.value);
//       return isNaN(value) ? undefined : value;
//     }
//   },
// });



// function setAboutMessage(_, { message }) {
//   return aboutMessage = message;
// }

// // resolver function for returning the workshopDB array
// const workshopList = async () => {
//   const workshops = await db
//     .collection("workshops")
//     .find({})
//     .toArray();
//   return workshops;
// };

// // get the next id available in the database
// const getNextSequence = async name => {
//   const result = await db
//     .collection("counters")
//     .findOneAndUpdate(
//       { _id: name },
//       { $inc: { current: 1 } },
//       { returnOriginal: false }
//     );
//   return result.value.current;
// };

// const validate = (workshop) => {
//   const errors = [];
//   if (workshop.title.length < 3) {
//     errors.push("Field 'title' must be at least 3 characters long.");
//   }
//   // if (workshop.status === "Assigned" && !workshop.owner) {
//   //   errors.push('Field "owner" is required when status is "Assigned"');
//   // }
//   if (errors.length > 0) {
//     throw new UserInputError("Invalid input(s)", { errors });
//   }
// }

// const workshopAdd = async (_, { workshop }) => {
//   const newWorkshop = { ...workshop };
//   validate(newWorkshop);
//   newWorkshop.created = new Date();
//   newWorkshop.id = await getNextSequence("workshops");
//   const result = await db.collection("workshops").insertOne(newWorkshop);
//   const savedWorkshop = await db
//     .collection("workshops")
//     .findOne({ _id: result.insertedId });
//   return savedWorkshop;
// };

// async function connectToDb() {
//   const client = new MongoClient(url, { useNewUrlParser: true });
//   await client.connect();
//   console.log('Connected to MongoDB at', url);
//   db = client.db();
// }

// const resolvers = {
//   Query: {
//     about: () => aboutMessage,
//     workshopList
//   },
//   Mutation: {
//     setAboutMessage,
//     workshopAdd
//   },
//   GraphQLDate
// };

// const server = new ApolloServer({
//   typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
//   resolvers,
//   formatError: error => {
//     console.log(error);
//     return error;
//   },
// });

// const app = express();


// app.use("/api/images", imagesApi);

// server.applyMiddleware({ app, path: '/graphql' });

// const port = process.env.API_SERVER_PORT || 3000;

// (async function () {
//   try {
//     await connectToDb();
//     app.listen(port, function () {
//       console.log(`API server started on port ${port}`);
//     });
//   } catch (err) {
//     console.log('ERROR:', err);
//   }
// })();