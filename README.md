# MadWalletJS

##### Requirements
- `Nodejs 12+`
- `NPM 6+`
##

##### Install
`npm install`
##

#### Usage
```
const MadWallet = require("madwalletjs");
const madWallet = new MadWallet(${CHAIN_ID}, ${MADNET_RPC})
```
##

#### Wallet Modules
- Account 
- Transaction
- RPC
> Details on these modules can be found in the docs
##

#### Docs
- Create the docs 
	- `npm run build-docs` 
- Open index with a browser
	- `firefox docs/index.html` 
##

#### Tests
> Create .env in tests/ to specify account, chainId, and RPC  
  Some tests will be skipped if .env variables are not present
- Run tests
	- `npm test`
