const Base = require("./Base");

Base.init({ collection: "users" });

module.exports = {
  ...Base,
};