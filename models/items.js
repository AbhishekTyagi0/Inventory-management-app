const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const itemSchema = new Schema({
  item_name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  categories: [
    {
      type: Schema.types.ObjectId,
      ref: "Categories",
    },
  ],
});

module.exports = mongoose.model("Items", itemSchema);
