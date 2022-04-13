const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    data: Buffer,
    required: true,
  },
});

const imageModel = mongoose.model("image", schema);

module.exports = { imageModel };
