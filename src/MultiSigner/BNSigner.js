const BNSignerWrapper = require('../GoWrappers/BNSignerWrapper.js')
const validator = require('../Validator.js');
/**
 * BNSigner
 * @class BNSigner
 */
class BNSigner {
    /**
     * Creates an instance of BNSigner.
     * @param {hex} privK
     */
    constructor(privK) {
        this.privK = validator.isHex(privK);
    }

    /**
     * Sign a message
     * @param {hex} msg
     * @return {hex} signature
     */
    async sign(msg) {
        try {
            msg = validator.isHex(msg);
            if (!msg) {
                throw "Bad argument type";
            }
            if (!this.privK) {
                throw "Private key not set";
            }
            let sig = await BNSignerWrapper.Sign({ "msg": String(msg), "privK": String(this.privK) });
            await this.verify(msg, sig);
            return sig;
        }
        catch (ex) {
            throw new Error("BNSigner.sign: " + String(ex));
        }
    }

    /**
     * Verify signature
     * @param {hex} msg
     * @param {hex} sig
     * @return {hex} public key
     */
    async verify(msg, sig) {
        try {
            msg = validator.isHex(msg);
            sig = validator.isHex(sig);
            if (!msg || !sig) {
                throw "Bad argument type"
            }
            let validate = await BNSignerWrapper.Verify(String(msg), String(sig));
            return validate;
        }
        catch (ex) {
            throw new Error("BNSigner.verify: " + String(ex));
        }
    }

    /**
     * Get public key from the private key
     * @return {hex} public key 
     */
    async getPubK() {
        try {
            if (!this.privK) {
                throw "Private key not set";
            }
            let pubK = await BNSignerWrapper.GetPubK(String(this.privK));
            return pubK;
        }
        catch (ex) {
            throw new Error("BNSigner.getPubK: " + String(ex));
        }
    }

    /**
     * Get the public key from a signature
     * @param {hex} sig
     * @return {hex} public key
     */
    async pubFromSig(sig) {
        try {
            sig = validator.isHex(sig);
            if (!sig) {
                throw "Bad argument type"
            }
            let pubK = await BNSignerWrapper.PubFromSig(String(sig));
            return pubK;
        }
        catch (ex) {
            throw new Error("BNSigner.pubFromSig: " + String(ex));
        }
    }
}
module.exports = BNSigner;
