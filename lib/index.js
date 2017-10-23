'use strict';
const validate = require('../bin/validate.js');

module.exports = (io, web3) => {
    io.on('connection', function(socket) {
        socket.on('callContract', (data, response) => {
            try {
                if (validate.isJson(data.abi) && validate.isAddress(data.address) && data.method) {
                    const myContract = new web3.eth.Contract(JSON.parse(data.abi), data.address);
                    eval(`myContract.methods.${data.method}(${data.arguments || ''}).call()`)
                    .then((value) => {
                        response(value);
                    });
                }
            } catch (error) {
                response(error.toString());
            }
        });
        socket.on('erc20Balance', (data, response) => {
            try {
                console.log('erc20Balance');
            } catch (error) {
                response(error.toString());
            }
        });
    });
};
