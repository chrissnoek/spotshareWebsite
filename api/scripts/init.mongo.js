/*
* Run using the mongo shell. For remote databases, ensure that the
connection string is supplied in the command line. For example:
localhost: mongo issuetracker scripts/init.mongo.js
Atlas: mongo mongodb+srv://spotshare:shareaspot01@cluster0-wg2gb.mongodb.net/test scripts/init.mongo.js
*/

/* global db print */
/* eslint no-restricted-globals: "off" */

db.workshops.remove({});

const workshopsDB = [{
    id: 8046,
    memberId: 4790,
    created: new Date("2018-08-15"),
    title: "Long Exposure",
    description: "Leer de fijne kneepjes van Long Exposure fotografie",
    date: new Date("2019-09-24T19:00:26"),
    maxPlaces: 10,
    attendees: 3,
    price: 75,
    place: "Rotterdam",
    images: {
        imageThumb: "https://www.spotshare.nl/site/assets/files/8065/eos_6dm2-482-3-4-2.746x746-pim2-thumbhome746.jpg",
        imageOriginal: "https://www.spotshare.nl/site/assets/files/8065/eos_6dm2-482-3-4-2.746x746-pim2-thumbhome746.jpg",
        imageWatermark: "https://www.spotshare.nl/site/assets/files/8065/eos_6dm2-482-3-4-2.746x746-pim2-thumbhome746.jpg"
    }
},
{
    id: 8047,
    memberId: 4790,
    created: new Date("2018-08-15"),
    title: "Fotografie basis",
    description: "Leer de basis van fotografie",
    date: new Date("2019-09-24T19:00:26"),
    maxPlaces: 10,
    attendees: 3,
    price: 75,
    place: "Amsterdam",
    images: {
        imageThumb: "https://www.spotshare.nl/site/assets/files/8065/eos_6dm2-482-3-4-2.746x746-pim2-thumbhome746.jpg",
        imageOriginal: "https://www.spotshare.nl/site/assets/files/8065/eos_6dm2-482-3-4-2.746x746-pim2-thumbhome746.jpg",
        imageWatermark: "https://www.spotshare.nl/site/assets/files/8065/eos_6dm2-482-3-4-2.746x746-pim2-thumbhome746.jpg"
    }
}
];

db.workshops.insertMany(workshopsDB);
const count = db.workshops.count();
print("Inserted", count, "workshops");

db.counters.remove({
    _id: "workshops"
});
db.counters.insert({
    _id: "workshops",
    current: count
});

db.workshops.createIndex({
    id: 1
}, {
    unique: true
});
db.workshops.createIndex({
    memberId: 1
}, {
    unique: true
});
db.workshops.createIndex({
    date: 1
});
db.workshops.createIndex({
    created: 1
});
