// fs is to include the schema.grapql file
const fs = require("fs");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");

const GraphQLDate = require('./grapqh_date.js');
const about = require('./about.js');
const workshop = require('./workshop.js');


const resolvers = {
    Query: {
        about: about.getMessage,
        workshopList: workshop.list,
        workshop: workshop.get
    },
    Mutation: {
        setAboutMessage: about.setMessage,
        workshopAdd: workshop.add
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