import elliptic from 'elliptic'
var secp256k1 = new elliptic.ec("secp256k1"); // eslint-disable-line
import { keccak256, keccak256s } from "./hash";


const toChecksum = function toChecksum(address) {
    var addressHash = keccak256s(address.slice(2));
    var checksumAddress = "0x";
    for (var i = 0; i < 40; i++) {
        checksumAddress += parseInt(addressHash[i + 2], 16) > 7 ? address[i + 2].toUpperCase() : address[i + 2];
    }return checksumAddress;
};
    
const fromPrivate = function fromPrivate(privateKey) {
    var buffer = new Buffer(privateKey.slice(2), "hex");
    var ecKey = secp256k1.keyFromPrivate(buffer);
    var publicKey = "0x" + ecKey.getPublic(false, 'hex').slice(2);
    var publicHash = keccak256(publicKey);
    var address = toChecksum("0x" + publicHash.slice(-40));
    return {
        address: address,
        privateKey: privateKey
    };
};

export const privateKeyToAccount = (privateKey) => {
    if (!privateKey.startsWith('0x')) {
        privateKey = '0x' + privateKey;
    }
    return fromPrivate(privateKey).address
}