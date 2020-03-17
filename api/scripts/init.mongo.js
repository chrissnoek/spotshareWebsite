/*
* Run using the mongo shell. For remote databases, ensure that the
connection string is supplied in the command line. For example:
localhost: mongo issuetracker scripts/init.mongo.js
Atlas: mongo mongodb+srv://spotshare:shareaspot01@cluster0-wg2gb.mongodb.net/test scripts/init.mongo.js
*/

/* global db print */
/* eslint no-restricted-globals: "off" */

db.photos.remove({});

const photosDB = [{
    id: 8046,
    memberId: 4790,
    created: new Date("2018-08-15"),
    title: "Long Exposure op locatie",
    description: "Mooie foto van een locatie",
    date: new Date("2019-09-24T19:00:26"),
    placeID: 1,
    eventID: 4,
    brand: "Sony",
    shutterspeed: "1/20",
    ISO: "100",
    aperture: "f14",
    camera: "ILCE-7M2",
    likes: 10,
    images: {
        imageThumb: "https://www.spotshare.nl/site/assets/files/8065/eos_6dm2-482-3-4-2.746x746-pim2-thumbhome746.jpg",
        imageOriginal: "https://www.spotshare.nl/site/assets/files/8065/eos_6dm2-482-3-4-2.746x746-pim2-thumbhome746.jpg",
        imageWatermark: "https://www.spotshare.nl/site/assets/files/8065/eos_6dm2-482-3-4-2.746x746-pim2-thumbhome746.jpg"
    }
},
{
    id: 8047,
    memberId: 4791,
    created: new Date("2018-08-15"),
    title: "Short Exposure op locatie",
    description: "Lelijke foto van een locatie",
    date: new Date("2019-09-24T19:00:26"),
    placeID: 2,
    eventID: 5,
    brand: "Canon",
    shutterspeed: "1/100",
    ISO: "200",
    aperture: "f8",
    camera: "ILCE-7M1",
    likes: 5,
    images: {
        imageThumb: "https://www.spotshare.nl/site/assets/files/8065/eos_6dm2-482-3-4-2.746x746-pim2-thumbhome746.jpg",
        imageOriginal: "https://www.spotshare.nl/site/assets/files/8065/eos_6dm2-482-3-4-2.746x746-pim2-thumbhome746.jpg",
        imageWatermark: "https://www.spotshare.nl/site/assets/files/8065/eos_6dm2-482-3-4-2.746x746-pim2-thumbhome746.jpg"
    }
}
];

db.photos.insertMany(photosDB);
const count = db.photos.count();
print("Inserted", count, "photos");

db.counters.remove({
    _id: "photos"
});
db.counters.insert({
    _id: "photos",
    current: count
});

db.photos.createIndex({
    id: 1
}, {
    unique: true
});
db.photos.createIndex({
    memberId: 1
}, {
    unique: true
});
db.photos.createIndex({
    date: 1
});
db.photos.createIndex({
    created: 1
});
