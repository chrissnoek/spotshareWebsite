const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

// resolver function for returning the photoDB array
const list = async (_, { category }) => {
    const db = getDb();
    const filter = {};
    if (category) filter.category = category;
    const photos = await db
        .collection("photos")
        .find(filter)
        .toArray();
    return photos;
};

const update = async (_, { id, changes }) => {
    const db = getDb();
    if (changes.title ||
        changes.date ||
        changes.shutterspeed ||
        changes.ISO ||
        changes.aperture ||
        changes.description ||
        changes.focalLength ||
        changes.brand ||
        changes.camera) {

        const photo = await db
            .collection("photos")
            .findOne({ id });
        Object.assign(photo, changes);
        validate(photo);
    }
    await db.collection('photos').updateOne({ id }, { $set: changes });
    const savedPhoto = await db.collection('photos').findOne({ id });
    return savedPhoto;
}

const remove = async (_, { id }) => {
    const db = getDb();
    const photo = await db.collection('photos').findOne({ id });
    if (!photo) return false;
    photo.deleted = new Date();

    let result = await db.collection('deleted_photos').insertOne(photo);
    if (result.insertedId) {
        result = await db.collection('photos').removeOne({ id });
        return result.deletedCount === 1;
    }
    return false;
}

// resolver function for returning one photo with matching ID
const get = async (_, { id }) => {
    const db = getDb();
    const photo = await db
        .collection("photos")
        .findOne({ id });
    return photo;
};

const validate = (photo) => {
    const errors = [];
    if (photo.title.length < 3) {
        errors.push("Field 'title' must be at least 3 characters long.");
    }
    // if (photo.status === "Assigned" && !photo.owner) {
    //   errors.push('Field "owner" is required when status is "Assigned"');
    // }
    if (errors.length > 0) {
        throw new UserInputError("Invalid input(s)", { errors });
    }
}

const add = async (_, { photo }) => {
    const db = getDb();
    const newPhoto = { ...photo };
    validate(newPhoto);
    newPhoto.created = new Date();
    newPhoto.id = await getNextSequence("photos");
    const result = await db.collection("photos").insertOne(newPhoto);
    const savedPhoto = await db
        .collection("photos")
        .findOne({ _id: result.insertedId });
    return savedPhoto;
};

module.exports = { list, add, get, update, delete: remove }