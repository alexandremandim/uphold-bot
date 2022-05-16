const { Pool } = require("pg");

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
});

exports.insertRecord = async (rate, botConfiguration, priceDifference, currencyPair) => {
	return pool.query(`
    INSERT INTO public."AlertRecords" (rate, bot_configuration, price_difference, currency_pair)
    VALUES ($1, $2, $3, $4)
    RETURNING timestamp
    `, [rate, botConfiguration, priceDifference, currencyPair]);
}

exports.close = async () => { return await pool.end() }