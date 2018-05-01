module.exports = {
    norpc: true,
    port: 8545,
    testrpcOptions: '-p 8545 -u 0x6f41fffc0338e715e8aac4851afc4079b712af70',
    testCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle test --network coverage',,
    compileCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle compile --network coverage'
}
