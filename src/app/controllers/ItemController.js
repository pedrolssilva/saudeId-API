const Item = require("../models/Item");
const ItemDetail = require("../models/ItemDetail");

module.exports = {
  async index(req,res){
    try {
      const {type, skip, limit} = req.query
      console.log('[IemController - index]',type, skip, limit)
      const options = {
        sort: { _id: 1 }
      }

      const result = await Item.findManyPaginated({Type: 'Movie'}, options, Number(skip), Number(limit));
      res.json(result);
    } catch (error) {
      console.error(
        `[IemController - index] error:`,error,
        );
      return res.status(500).json({
        message: error
     });  
    }
  },
  async show(req, res){
    try {
      const { id } = req.params

      const itemDetailFound = await ItemDetail.findOne({itemId: id})
      return res.json({itemDetail: itemDetailFound});
    } catch (error) {
      console.error(
        `[IemController - show] error:`,error,
        );
      return res.status(500).json({
        message: error
     }); 
    }

  }
};