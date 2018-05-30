/**
 * 接收数据
 */
const ws = require('uws');
const Data = require('./data');

const myData = new Data();

const websocketClient = new ws('ws://10.10.1.119:8888/data');

websocketClient.on('message', (data) => {

    if (data !== 'something') {
        
        //console.log(data);
        myData.receiveData(data);
        
    }
});

module.exports = function(){

};
