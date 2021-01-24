# Agriculutral News Aggregator

## Installing Database:
**run sources.sql_ from the /db folder as source in MySQL**
> source sources.sql

## Build node_modules:
**On terminal, run the following script:**
1. for server-side
> npm run-script build-server

2. for client-side
> npm run-script build-client

## Training Naive-Bayes classifier:
**When updating the classifier, on the terminal, run the following script:**
> npm run-script train

## Running the program:
**Start the server and client thru the ff. script:**
> npm start

## Reminder
**Make sure that _node_modules_ for server and client-side are installed**

List of imported libraries and modules:
1. body-parser
2. express
3. mysql
4. natural
5. rss-parser
6. package.json
7. path
8. node-localstorage

**Check MYSQL Connector credentials**
> MYSQL connector can be found at ../db_config/mysql.js