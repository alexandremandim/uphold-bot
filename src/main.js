require('dotenv').config()
const { program } = require('commander');
const UpHoldPair = require('./upholdpair.js');
const { insertRecord, close } = require('./postgres-connector');

/* Arguments */
program
	.requiredOption('-f, --fetch-interval <number>', 'fetch ticker interval in milliseconds', '5000')
	.requiredOption('-c, --currency-pairs <list>', 'currency pairs list', 'BTC-USD,ARS-USD,CAD-USD')
	.requiredOption('-p, --price-osc-perc <number>', 'price Oscillation Percentage', '0.01')

program.parse();
const options = program.opts();
const priceOscilalationPercentage = parseFloat(options.priceOscPerc)
const rate = parseFloat(options.fetchInterval)
const currencyPairs = options.currencyPairs.split(',')

/**
 * Create pair objects based on currency pairs list
 */
let allPairsObjects = currencyPairs.map((pair) => { return new UpHoldPair(pair) })

/**
 * Check price oscilation in a give pair and alert if necessary
 * @param {UpHoldPair} pairObject
 * @returns 
 */
let checkPairDifference = async (pairObject) => {
	let priceDifferencePercentage = await pairObject.compareTickers()

	if (priceDifferencePercentage == undefined) {
		return
	}
	if (Math.abs(priceDifferencePercentage) >= priceOscilalationPercentage) {
		console.log('ALERT on', pairObject.pair, ' Price difference ', priceDifferencePercentage.toFixed(4), '%')
		// persist record in database
		let insertResponse = await insertRecord(rate, options, priceDifferencePercentage, pairObject.pair)
		if (insertResponse.rowCount != 1) {
			console.log('Cannot store record in database', insertResponse)
		}
	}
}


console.log('\nStarting UpHold bot')
console.log('Fetch Interval', rate, 'ms')
console.log('Currency pairs', currencyPairs)
console.log('Oscilation Percentage ', priceOscilalationPercentage, '%')
console.log('To terminate the loop press (Ctrl + C)\n')

const intervalID = setInterval(async () => {
	await Promise.all(allPairsObjects.map((pairObject) => {
		checkPairDifference(pairObject)
	}))
}, rate)

const goodByeFunction = () => {
	console.log("\nStopping loop");
	clearInterval(intervalID)

	console.log('Closing database pool')
	close()
}

process.on('SIGINT', goodByeFunction);
process.on('SIGTERM', goodByeFunction);