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
