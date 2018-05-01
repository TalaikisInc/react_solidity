require('babel-register')
require('babel-polyfill')
const assert = require('assert')
const chalk = require('chalk')
const prod = process.env.ENV === 'production'
const Web3 = require('web3')
const web3 = new Web3()
const Contract = artifacts.require('./Contract.sol')

assert.equal(typeof process.env.OWNER, 'string', 'We need owner address')

module.exports = function(deployer, network, accounts) {
  const _wallet = prod ? process.env.OWNER : accounts[0]

  return deployer
    .then(() => {
      return deployer.deploy(
        Contract, { from: _wallet, gas: 6712390, gasPrice: web3.toWei(4, 'gwei') }
      )
    })
    .then(async () => {
      const token = await Contract.deployed()
      console.log(`Token address: ${chalk.green(token.address)}`)
    })

}
