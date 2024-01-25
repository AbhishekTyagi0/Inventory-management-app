const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//adding enum for categories such as food or beverages and so on
const categorySchema = new Schema({
  category: {
    type: String,
    require: true,
    enum: ["Food", "Beverage", "General"],
  },
});

categorySchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model("Categories", categorySchema);
