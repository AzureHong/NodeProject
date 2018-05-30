const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://10.10.1.236:27017';
const dbName = 'yy_test';
var db;

MongoClient.connect(url, function (err, client) {
    console.log("MongoClient");
    console.log("Connected successfully to server");

    db = client.db(dbName);
});


const insertDocuments = function (db, callback) {

    console.log("执行insertDocuments");

    const collection = db.collection('documents');

    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function (err, result) {

        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}


