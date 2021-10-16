const {client, database} = require('../../config/mongodb');
const Base = require("./Base");

Base.init({ collection: "items" });

async function findManyPaginated(queryParams, options = [],skip = 0, limit = 5) {
  try {
    await client.connect();
    const foundCollection = database.collection(this.collection);
    const count = await foundCollection.count(); 

    const cursor = await foundCollection.find(queryParams, options)
    .skip( skip > 0 ? skip : 0 )
    .limit( limit );

    if ((await cursor.count()) === 0) {
      console.log("[Item - findManyPaginated] No items found!");
      return {
        count: 0,
        items: []
      };
    }

    const items = await cursor.toArray();
    return {
      count,
      items
    };
  } finally {
    await client.close();
  }
}

module.exports = {
  ...Base,
  findManyPaginated
};