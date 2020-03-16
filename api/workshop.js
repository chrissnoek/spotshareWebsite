const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

// resolver function for returning the workshopDB array
const list = async (_, { category }) => {
    const db = getDb();
    const filter = {};
    if (category) filter.category = category;
    const workshops = await db
        .collection("workshops")
        .find(filter)
        .toArray();
    return workshops;
};

// resolver function for returning one workshop with matching ID
const get = async (_, { id }) => {
    const db = getDb();
    const workshop = await db
        .collection("workshops")
        .findOne({ id });
    return workshop;
};

const validate = (workshop) => {
    const errors = [];
    if (workshop.title.length < 3) {
        errors.push("Field 'title' must be at least 3 characters long.");
    }
    // if (workshop.status === "Assigned" && !workshop.owner) {
    //   errors.push('Field "owner" is required when status is "Assigned"');
    // }
    if (errors.length > 0) {
        throw new UserInputError("Invalid input(s)", { errors });
    }
}

const add = async (_, { workshop }) => {
    const db = getDb();
    const newWorkshop = { ...workshop };
    validate(newWorkshop);
    newWorkshop.created = new Date();
    newWorkshop.id = await getNextSequence("workshops");
    const result = await db.collection("workshops").insertOne(newWorkshop);
    const savedWorkshop = await db
        .collection("workshops")
        .findOne({ _id: result.insertedId });
    return savedWorkshop;
};

module.exports = { list, add, get }