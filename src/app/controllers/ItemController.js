const { hash } = require("bcryptjs");
const jwt = require('jsonwebtoken');
var {ObjectId} = require("mongodb")
const Item = require("../models/Item")

module.exports = {
  async index(req,res){
    try {
      const {type, skip, limit} = req.query
      console.log('[IemController - index]',type, skip, limit)
      const options = {
        sort: { _id: 1 }
      }

      const items = await Item.findManyPaginated({Type: 'Movie'}, options, Number(skip), Number(limit));
      res.json(items);
    } catch (error) {
      console.error(
        `[IemController - index] error:`,error,
        );
      return res.status(500).json({
        message: error
     });  
    }
  },
};