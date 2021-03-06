const fs = require("fs");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");

const GraphQLDate = require('./graphql_date.js');
const about = require('./about.js');
const photo = require('./photo.js');

const resolvers = {
    Query: {
        about: about.getMessage,
        photoList: photo.list,
        photo: photo.get
    },
    Mutation: {
        setAboutMessage: about.setMessage,
        photoAdd: photo.add,
        photoUpdate: photo.update,
        photoDelete: photo.delete
    },
    GraphQLDate
};

const server = new ApolloServer({
    cors: {
        origin: "*", // <- allow request from all domains
        credentials: true
    },
    typeDefs: fs.readFileSync("schema.graphql", "utf-8"),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    }
});

const installHandler = (app) => {
    const enableCors = (process.env.ENABLE_CORS || "true") === "true";
    console.log("CORS SETTINGS:", enableCors);
    server.applyMiddleware({ app, path: "/graphql", cors: enableCors });
}

module.exports = { installHandler }