# React Solidity Boilerplate

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/powerpiper/react_solidity.svg)](https://david-dm.org/powerpiper/react_solidity)
[![devDependency Status](https://david-dm.org/powerpiper/react_solidity/dev-status.svg)](https://david-dm.org/powerpiper/react_solidity/?type=dev)
[![Build Status](https://travis-ci.org/powerpiper/react_solidity.svg?branch=master)](https://travis-ci.org/powerpiper/react_solidity)

## Usage

### Start new project

```
git clone https://github.com/powerpiper/react_solidity
cd react_solidity
npm i
cd app
npm i
```

### Start dApp in development

```
npm run rpc
truffle compile --network development
truffle migrate --network development --reset
// copy contract files to dApp:
npm run copy
cd app
npm start
```

### Deploy through local geth

Edit .env for owner wwallet.

```
cross-env ENV=production npm run geth:rinkeby
truffle migrate --network rinkeby
npm run copy
```

### Deploy through Infura

Edit .env for your Infura API key and owner wallet.

```
cross-env ENV=production truffle migrate --network main
npm run copy
```

### Test

```
npm run rpc
npm run test
```

### Lint contract

```
npm run lint:contract
npm run lint:contract:fix
```

### Flatten contract

```
npm run flatten
```

### Make graph of the contract

```
npm run graph
```

And then see graph/.

### Clean

```
npm run clean
```
### Coverage

```
npm run coverage
```

### Run dApp

```
cd app
npm start
```

## Contribute

PRs welcome.

## Technologies

* [Solidity](https://github.com/ethereum/solidity)
* [Truffle](https://github.com/trufflesuite/truffle)
* See also app/ for frontend part.

## License

MIT