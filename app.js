const bitcoin = require('bitcoinjs-lib');

const keyPair1 = bitcoin.ECPair.makeRandom();
const keyPair2 = bitcoin.ECPair.makeRandom();
const keyPair3 = bitcoin.ECPair.makeRandom();

let pubkeys = [];
pubkeys.push(keyPair1.publicKey);
pubkeys.push(keyPair2.publicKey);
pubkeys.push(keyPair3.publicKey);

const redeem = bitcoin.payments.p2ms({m: 2, pubkeys});
const p2sh = bitcoin.payments.p2sh({redeem: redeem});

console.log('address', p2sh.address, 'redeem script:', redeem.output.toString('hex'));
showKey('  key 1', keyPair1);
showKey('  key 2', keyPair2);
showKey('  key 3', keyPair3);

function showKey(txt, keyPair) {
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    console.log(txt, address, 'public key in hex:', keyPair.publicKey.toString('hex'), 'private key in WIF:', keyPair.toWIF());
}
