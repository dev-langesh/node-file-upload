const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect("mongodb://localhost:27017", () => {
    console.log(`connected to mongodb`);
  });
}

module.exports = { connectDB };
