const { getUpHoldTicker } = require('./upholdconnector')

class UpHoldPair {
	constructor(pair) {
		this.pair = pair
		this.lastPrice = undefined
		this.currentPrice = undefined
	}

	/**
	 * Get a new ticker from Uphold API and calculate the price difference in percentage.
	 * @returns {number} The price difference between last and current ticker or undefined if data not available
	 */
	async compareTickers() {
		let newTicker = undefined
		try {
			newTicker = await getUpHoldTicker(this.pair)
		} catch (error) {
			console.error(error);
			return undefined
		}

		this.currentPrice = parseFloat(newTicker?.ask)

		if (this.currentPrice == null || this.lastPrice == null) {
			this.lastPrice = this.currentPrice
			return
		}

		let priceDifferencePercentage = ((this.lastPrice - this.currentPrice) / this.currentPrice) * 100

		this.lastPrice = this.currentPrice

		return priceDifferencePercentage
	}
}

module.exports = UpHoldPair