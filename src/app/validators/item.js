async function index(req, res, next) {
  try {
    const {type, skip, limit} = req.query
   
    if (!type || !skip || !limit) {
      return res.status(400).send({
        message: 'All query parameters required!'
      });
    }
    next();
  } catch (error) {
    console.error(
      `[ItemValidator - index] error:`,error,
      );
  }
}

async function show(req, res, next) {
  try {
    const {id} = req.params
   
    if (!id) {
      return res.status(400).send({
        message: 'id parameter is required!'
      });
    }
    next();
  } catch (error) {
    console.error(
      `[ItemValidator - index] error:`,error,
      );
  }
}

module.exports = {
  index,
  show
};