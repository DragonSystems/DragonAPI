'use strict';

exports.isAddress = function(address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        throw new Error('Address Contract Invalid');
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        return true;
    }
};

exports.isJson = function(abi) {
    try {JSON.parse(abi);} catch (e) {
        throw new Error('ABI Is not JSON');
    } return true;
};
