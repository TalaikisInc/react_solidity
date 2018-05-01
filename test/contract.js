require('babel-register')
import assertRevert from './helpers/assertRevert'
const Contract = artifacts.require('./Contract.sol')

contract('Contract', function ([owner, recipient, anotherAccount]) {
  describe('initial conditions', () => {
    it('should have 0 tokens in the recipient account', async () => {
      return Contract.deployed().then(async (instance) => {
        return instance.balanceOf.call(recipient)
      }).then(async (balance) => {
        assert.equal(balance.valueOf(), 0, `0 wasn't in the recipient account`)
      })
    })
  })

  it('should have an owner', async () => {
    return Contract.deployed().then(async (instance) => {
      return instance.owner.call()
    }).then(async (res) => {
      assert.isTrue(res !== 0)
    })
  })

  it('owner is not someome else', async () => {
    return Contract.deployed().then(async (instance) => {
      return instance.owner.call()
    }).then(async (res) => {
      assert.isTrue(res !== anotherAccount)
    })
  })

  it('should prevent non-owners from transfering', async () => {
    return Contract.deployed().then(async (instance) => {
      return assertRevert(instance.transferOwnership(anotherAccount, { from: anotherAccount }))
    })
  })

  it('should guard ownership against stuck state', async () => {
    return Contract.deployed().then(async (instance) => {
      return instance.owner.call()
    }).then(async (originalOwner) => {
      return Contract.deployed().then(async (instance) => {
        return assertRevert(instance.transferOwnership(null, { from: originalOwner }))
      })
    })
  })
})
