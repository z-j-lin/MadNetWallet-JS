const BNSigner = require('./MultiSigner/BNSigner.js');
const SecpSigner = require('./MultiSigner/SecpSigner.js');
const validator = require('./Validator.js');
const ethUtil = require('ethereumjs-util');
/**
 * Signature handler
 * @class MultiSigner
 */
class MultiSigner {
    /**
     * Creates an instance of MultiSigner.
     * @param {hex} privK
     * @param {number} curve
     */
    constructor(privK, curve) {
        this.curve = validator.isNumber(curve);
        this.bnSigner = validator.isNumber(curve) === 2 ? new BNSigner(privK) : false;
        this.secpSigner = validator.isNumber(curve) === 1 ? new SecpSigner(privK) : false;
    }

    /**
     * Sign a message with specified curve
     * @param {hex} msg
     * @return {hex} signature
     */
    async sign(msg) {
        try {
            if (!msg) {
                throw "Missing input";
            }
            if (msg.indexOf("0x") === 0) {
                msg = validator.isHex(msg);
            }
            else {
                msg = validator.txtToHex(msg);
            }
            let signature;
            switch (this.curve) {
                case 1:
                    try {
                        signature = await this.secpSigner.sign(msg);;
                    }
                    catch (ex) {
                        throw ex;
                    }
                    break;;
                case 2:
                    try {
                        signature = await this.bnSigner.sign(msg);;
                    }
                    catch (ex) {
                        throw ex;
                    }
                    break;;
                default:
                    throw "Invalid curve";;
            }
            return signature;
        }
        catch (ex) {
            throw new Error("MultiSigner.sign: " + String(ex));
        }
    }

    /**
     * Get the public key from the set private key
     * @return {hex} public key
     */
    async getPubK() {
        try {
            let pubK;
            if (this.curve === 1) {
                pubK = await this.secpSigner.getPubK();
            } else if (this.curve === 2) {
                pubK = await this.bnSigner.getPubK();
            } else {
                throw "Invalid curve";
            }
            return pubK
        }
        catch (ex) {
            throw new Error("MultiSigner.getPubK: " + String(ex));
        }
    }

    /**
     * Get address from public key
     * @return {hex} address
     */
    async getAddress() {
        try {
            let pubK = await this.getPubK()
            let address;
            switch (this.curve) {
                case 1:
                    address = this.ethPubToAddress(pubK);;
                    break;;
                case 2:
                    address = this.bnPubToAddress(pubK);;
                    break;;
                default:
                    throw "Invalid curve for public key";
            }
            return address;
        }
        catch (ex) {
            throw new Error("MultiSigner.getAddress: " + String(ex));
        }
    }

    /**
     * Public key to a BN address
     * @param {hex} pubK
     * @return {hex} address 
     */
    bnPubToAddress(pubK) {
        try {
            pubK = validator.isHex(pubK);
            if (!pubK) {
                throw "Bad argument type"
            }
            let pubHash = ethUtil.keccak256(Buffer.from(pubK, "hex").slice(1));
            let address = pubHash.slice(12);
            return address.toString("hex");
        }
        catch (ex) {
            throw new Error("MultiSigner.bnPubToAddres: " + String(ex));
        }
    }

    /**
     * Public key to Ethereum Address
     * @param {hex} pubK
     * @return {hex} address
     */
    ethPubToAddress(pubK) {
        try {
            pubK = validator.isHex(pubK);
            if (!pubK) {
                throw "Bad argument type"
            }
            pubK = Buffer.from(pubK, "hex");
            if (pubK.length === 32) {
                return pubK.slice(12);
            }
            let address = ethUtil.pubToAddress(pubK);
            return address.toString("hex");
        }
        catch (ex) {
            throw new Error("MultiSigner.ethPubToAddres: " + String(ex));
        }
    }

    /**
     * KECCAK256 Hash
     * @param {hex} msg
     * @return {hex} 
     */
    hash(msg) {
        try {
            msg = validator.isHex(msg);
            if(!msg) {
                throw "Bad argument type"
            }
            let msgBuffer = Buffer.from(msg, "hex");
            let msgHash = ethUtil.keccak256(msgBuffer);
            return msgHash.toString("hex")
        }
        catch (ex) {
            throw new Error("MultiSigner.hash: " + String(ex));
        }
    }
}
module.exports = MultiSigner;
