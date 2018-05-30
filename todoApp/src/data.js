const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://10.10.1.236:27017';
const dbName = 'warningSystem_V1_0';
var db;

var count = 0;
MongoClient.connect(url, function (err, client) {

    console.log("Connected successfully to server");
    db = client.db(dbName);
});


const insertDocuments = function (db, callback) {

    const collection = db.collection('documents');

    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function (err, result) {

        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

var testData = {
    "ST": "31", "CN": "2011", "PW": "123456", "MN": "77777770000004", "data": [
        { "commNumber": "2001", "value": "2.9125" },
        { "commNumber": "2003", "value": "115.2600" },
        { "commNumber": "2005", "value": "28.9750" },
        { "commNumber": "2007", "value": "78.5450" },
        { "commNumber": "2009", "flag": "HL" },
        { "commNumber": "2011", "value": "0.0000" },
        { "commNumber": "0029", "value": "2.7915" },
        { "commNumber": "0015", "value": ["0.0000", "0.0000"] }], "DataTime": "20180507154010", "type": "Rtd"
};

const findBiStations = function (db, conditions,callback) {

    let collection = db.collection('BI_Stations');

    collection.find({}).toArray(function (err, docs) {
        
        console.log("Found the following records");
        callback(docs);
    });
}


module.exports = class Data {
    constructor() {

    }

    // receiveData(data)
    receiveData(rs) {

        count++;
        console.log('访问次数='+count);

        console.log(rs);
        // 第一种方案：直接处理进入数据库后再进行批量操作处理

        // 第二种方案：在前端进行数据的处理，处理成为半成品或成品数据后再进行数据库相关的操作
        /*
            1. 存档原始数据，并将原始数据的通讯情况存档（此部分再进行细致分割）
            2. 对获取的数据进行一定的丰富与规则则解析
            3. 数据存档
            4. 后续定时任务调度进行相应的规则计算与处理（另行统一的模式调度性任务处理）

        */
        findBiStations(db,null,function(){
            console.log('search Finished!')
        })

        // 具体的匹配规则
        // let datas = testData.data;
        // datas.forEach(data => {
        //     data["stId"] = 1;
        //     data["stName"] = '管委会子站';
        //     data["monitorTime"] = testData.DataTime;
        //     data["status"] = 0;
        // });

        // console.log(testData);
        //console.log(JSON.stringify(data));

    }
};

/*

{"ST":"31","CN":"2011","PW":"123456","MN":"77777770000004",
"data":[
    {"commNumber":"2001","value":"2.9125"},
    {"commNumber":"2003","value":"115.2600"},
    {"commNumber":"2005","value":"28.9750"},
    {"commNumber":"2007","value":"78.5450"},
    {"commNumber":"2009","flag":"HL"},
    {"commNumber":"2011","value":"0.0000"},
    {"commNumber":"0029","value":"2.7915"},
    {"commNumber":"0015","value":["0.0000","0.0000"]}],
    "DataTime":"20180507154010","type":"Rtd"}
*/
/*
{"ST":"31","CN":"2011","PW":"123456","MN":"77777770000004",
    "data":[
        {"commNumber":"2001","flag":"IND"},
        {"commNumber":"2003","flag":"IND"},
        {"commNumber":"2005","value":"29.2950"},
        {"commNumber":"2007","value":"81.0200"},
        {"commNumber":"2009","value":"1032.0000"},
        {"commNumber":"2011","value":"0.0000"},
        {"commNumber":"0003","value":"0.0000"},
        {"commNumber":"0023","value":"0.0000"},
        {"commNumber":"0029","value":"2.7812"},
        {"commNumber":"0033","value":"0.0000"},
        {"commNumber":"0037","value":"0.0000"},
        {"commNumber":"0045","value":"0.0347"},
        {"commNumber":"0053","value":"0.1846"},
        {"commNumber":"0059","value":"0.0923"},
        {"commNumber":"0069","value":"1.4609"},
        {"commNumber":"0083","value":"0.0000"},
        {"commNumber":"0087","value":"0.0000"},
        {"commNumber":"0095","value":"0.0000"},
        {"commNumber":"0097","value":"0.0000"},
        {"commNumber":"0131","value":"0.0026"},
        {"commNumber":"0155","value":"0.0000"},
        {"commNumber":"0157","value":"0.1309"},
        {"commNumber":"0173","value":"0.1357"},
        {"commNumber":"0289","value":"0.0000"},
        {"commNumber":"0295","value":"0.0000"},
        {"commNumber":"0305","value":"0.0194"},
        {"commNumber":"0327","value":"0.0000"},
        {"commNumber":"0333","value":"0.0000"},
        {"commNumber":"0377","value":"0.0000"},
        {"commNumber":"0411","value":"0.6680"},
        {"commNumber":"0487","value":"0.0000"},
        {"commNumber":"0515","value":"0.0000"},
        {"commNumber":"0523","value":"0.0000"},
        {"commNumber":"0537","value":"0.0000"},
        {"commNumber":"0549","value":"0.0000"},
        {"commNumber":"0647","value":"0.0000"},
        {"commNumber":"0685","value":"0.0000"},
        {"commNumber":"0743","value":"0.0000"},
        {"commNumber":"0747","value":"0.0000"},
        {"commNumber":"0015","value":["0.0000","0.0000"]}],
        "DataTime":"20180507155709","type":"Rtd"}

        */