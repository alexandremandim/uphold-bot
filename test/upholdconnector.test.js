require('dotenv').config()

const axios = require('axios');
const {getUpHoldTicker} = require('../src/upholdconnector')

test('Uphold get ticker data', async () => {
    const goodResponseData = await getUpHoldTicker('BTC-USD')
    
    expect(goodResponseData.hasOwnProperty('bid')).toBe(true)
    expect(goodResponseData.hasOwnProperty('ask')).toBe(true)
    expect(goodResponseData.hasOwnProperty('currency')).toBe(true)
})

test('Throw error when currency code is wrong', async () => {
    await expect(async () => {
        await getUpHoldTicker('BTC-USDERROR')
    }).rejects.toThrowError()
})
