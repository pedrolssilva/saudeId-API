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

module.exports = {
  index,
};