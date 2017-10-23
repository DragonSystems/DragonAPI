var app = require('express')();
// eslint-disable-next-line new-cap
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Web3 = require('web3');
//const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://139.59.240.233:8546'));
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));

io.on('connection', function(socket) {

    socket.on('callContract', (data, response) => {
        try{
            if(isJson(data.abi) && isAddress(data.address) && data.method){
                const myContract = new web3.eth.Contract(JSON.parse(data.abi), data.address);
                eval(`myContract.methods.${data.method}(${data.arguments || ''}).call()`)  
                .then((value) => {
                    response(value);
                });
            }
        } catch(error) {
            response(error.toString());
        }
    });

});

var isAddress = (address) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) { 
        throw "Address Contract Invalid";
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        return true;
    }
};

var isJson = (abi) => {
    try { JSON.parse(abi);} catch(e) {
        throw "ABI Is not JSON";
    } return true;
}

const PORT = 8011;
const HOST = '0.0.0.0';
server.listen(PORT, HOST);
