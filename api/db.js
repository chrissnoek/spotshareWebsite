require("dotenv").config();
const { MongoClient } = require("mongodb");


let db;

const connectToDb = async () => {
    const url = process.env.DB_URL || "mongodb+srv://spotshare:shareaspot01@cluster0-wg2gb.mongodb.net/test";
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await client.connect();
    console.log("Connected to MongoDB at", url);
    db = client.db();
};

// get the next id available in the database
const getNextSequence = async name => {
    const result = await db
        .collection("counters")
        .findOneAndUpdate(
            { _id: name },
            { $inc: { current: 1 } },
            { returnOriginal: false }
        );
    return result.value.current;
};

const getDb = () => db;

module.exports = { getDb, connectToDb, getNextSequence }