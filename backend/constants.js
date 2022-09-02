const { MongoClient } = require("mongodb");
const { MONGODB_URI } = process.env;
const mongoClient = new MongoClient(MONGODB_URI);

module.exports = { mongoClient };