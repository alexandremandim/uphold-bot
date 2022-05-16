# Uphold Assessment bot

## Requirements

### **Execute bot from terminal**

This application persist information in a postgresql database. In order to execute the bot from terminal, it's mandatory to have:

- A PostgreSQL server running
- Define all environment variables in order to access database.
  - Environment variables can be defined directly in terminal or .env file
  - POSTGRES_HOST, POSTGRES_USER, POSTGRES_PORT, POSTGRES_PASSWORD
- Execute `npm run createdb` to create a database and a table in PostgreSQL server
- Execute `npm install` to install dependencies

### **Execute bot from docker containers**

If you want to execute with docker containers you just **need to define some environment variables**. PostgreSQL server and database/table creation are docker's responsibility

- Environment variables needed: POSTGRES_USER, POSTGRES_PASSWORD

---

## Run app from terminal

Example: bot checking every 2000ms for 0.01% oscillations in BTC-USD and ETH-USD:

`node src/main.js -f 2000 -c BTC-USD,ETH-USD -p 0.01`

If you want to check all arguments available:

`node src/main.js --help`

---

## Run app in docker containers

Create and start postgres and bot containers:

`docker-compose -f docker-compose.yml up --build`

---

## Run tests in terminal

`npm run test`
