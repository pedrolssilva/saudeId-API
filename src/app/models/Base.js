const {client, database} = require('../../config/mongodb');

const Base = {
  init({ collection }) {
    if (!collection) {
      throw new Error("Invalid collection");
    }

    this.collection = collection;
    return this;
  },
  async insertOne(data){
    try {
      await client.connect();
      const foundCollection = database.collection(this.collection);
      if(foundCollection) {
        const result = await foundCollection.insertOne(data);
        console.log(
        `A document was inserted into ${this.collection} with the _id: ${result.insertedId}`,
        );
        return result.insertedId;
      }
    } finally{
      await client.close();
    }
  },
  async insertMany(data){
    try {
      await client.connect();
      const foundCollection = database.collection(this.collection);
      if(foundCollection) {
        const options = { ordered: true };
        const result = await foundCollection.insertMany(data, options);
        console.log(
        `${result.insertedCount} documents were inserted`,
        );
        return result.insertedId;
      }
    } finally{
      await client.close();
    }
  },
  async findOne(queryParams){
    try {
      await client.connect();
      const foundCollection = database.collection(this.collection);
      const itemFound = await foundCollection.findOne(queryParams);
      console.log(
        `[Base - findOne] itemFound:`,itemFound,
        );
      return itemFound;
    } finally {
      await client.close();
    }
  },
  async findMany(queryParams, options = []){
    try {
      await client.connect();
      const foundCollection = database.collection(this.collection);

      const cursor = await foundCollection.find(queryParams, options);
      if ((await cursor.count()) === 0) {
        console.log("No items found!");
        return [];
      }

      return await cursor.toArray();
    } finally {
      await client.close();
    }
  },
  async updateOne(data, id){
    try {
      await client.connect();
      const foundCollection = database.collection(this.collection);

      const filter = { _id: id };
      const options = { upsert: false };

      const updateInfo = {
        $set: { ...data},
      };

      const result = await foundCollection.updateOne(filter, updateInfo, options);
     
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );
    } finally {
      await client.close();
    }
  },
  async deleteOne(id){
    try {
      await client.connect();
      const foundCollection = database.collection(this.collection);
      const query = { _id: id };

      const result = await foundCollection.deleteOne(query);
      if (result.deletedCount === 1) {
        console.log("[Base - deleteOne] Successfully deleted one document.");
      } else {
        console.log("[Base - deleteOne] No documents matched the query. Deleted 0 documents.");
      }
    } finally {
      await client.close();
    }
  }
};

module.exports = Base;
