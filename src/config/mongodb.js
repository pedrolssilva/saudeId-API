
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://userId:userid@saudeidcluster.nu7b4.mongodb.net/saudeIdCluster?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const database = client.db('saudeIdCluster');

module.exports = { client, database};