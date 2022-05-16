require('dotenv').config()

const { exportAllDeclaration } = require('@babel/types');
const UpHoldPair = require('../src/upholdpair.js');
const { getUpHoldTicker } = require('../src/upholdconnector')


jest.mock('../src/upholdconnector');

const pairCode = 'BTC-USD'

test('Test right difference', async () => {
    let testPair = new UpHoldPair(pairCode, 0.01)
    testPair.lastPrice = 0.77742

    getUpHoldTicker.mockResolvedValue({
        "ask": "0.87742",
        "bid": "0.87742",
        "currency": "USD"
    })
    
    console.log = jest.fn();

    let diff = await testPair.compareTickers()

    expect(diff).toEqual(-11.39705044334526)
})

test('Current and last price changes', async () => {
    let testPair = new UpHoldPair(pairCode, 0.01)
    expect(testPair.pair).toMatch(pairCode)
    testPair.lastPrice = 12345

    getUpHoldTicker.mockResolvedValue({
        "ask": "0.87742",
        "bid": "0.87742",
        "currency": "USD"
    })

    await testPair.compareTickers()
    expect(testPair.currentPrice).toEqual(0.87742)
    expect(testPair.lastPrice).toEqual(0.87742)
})
