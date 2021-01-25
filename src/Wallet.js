const Account = require("./Account.js")
const Transaction = require("./Transaction.js")
const RPC = require("./RPC.js");
const validator = require("./Validator.js");
/**
 * Wallet handler
 * @class Wallet
 * @typedef {hex} hex
 */
class Wallet {
    /**
     * Creates an instance of Wallet.
     * @param {number} [chainId=1]
     * @param {string} [rpcServer=false]
     */
    constructor(chainId, rpcServer = false) {
        this.chainId = chainId ? validator.isNumber(chainId) : 1;
        this.Account = new Account(this)
        this.Transaction = new Transaction(this);
        this.Rpc = new RPC(this, rpcServer);
    }
}
module.exports = Wallet;