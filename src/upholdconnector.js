const axios = require('axios');

const upholdBaseUrl = process.env.UPHOLD_API_URL

/**
 * Send a get request to Uphold API in order to get next ticker for a give currency pair.
 * @param {string} pairCode Currency pair code, e.g. BTC-USD
 * @returns {object} A object with 3 properties: bid, ask and currency
 */
exports.getUpHoldTicker = async (pairCode) => {
    let response = await axios.get(upholdBaseUrl + pairCode);
    if(response?.status != 200 || response?.statusText != "OK"){
        throw new Error('Fail in getting ticker from uphold')
    }
    return response.data
}