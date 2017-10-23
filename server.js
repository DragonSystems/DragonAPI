var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://139.59.240.233:8546'));
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));
exports.io = require('./lib/index.js')(io, web3);
module.exports = server;
server.listen(8011, '0.0.0.0');
