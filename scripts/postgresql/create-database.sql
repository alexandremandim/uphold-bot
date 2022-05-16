DROP DATABASE IF EXISTS upholdassessment;
CREATE DATABASE upholdassessment;

\c upholdassessment

DROP TABLE IF EXISTS "public"."AlertRecords";
CREATE TABLE "public"."AlertRecords"
(
    "timestamp" timestamp with time zone NOT NULL DEFAULT now(),
    rate integer NOT NULL,
    bot_configuration json NOT NULL,
    price_difference double precision NOT NULL,
    currency_pair text NOT NULL,
    PRIMARY KEY ("timestamp")
);