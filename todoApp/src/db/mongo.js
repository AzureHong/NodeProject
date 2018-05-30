
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://10.10.1.236:27017/yy_test';

module.exports = class Mongodb {
    constructor() {
        //
    }

    static async connect() {
        this.client = await MongoClient.connect(url);

        return this.client;
    }
};