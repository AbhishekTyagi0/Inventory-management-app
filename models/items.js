const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  item_name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: [
    {
      type: Schema.Types.ObjectId,
      ref: "ItemStatus",
    },
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Categories",
    },
  ],
});

// added virtual for item's URL
itemSchema.virtual("url").get(function () {
  return `/items/${this._id}`;
});

module.exports = mongoose.model("Items", itemSchema);
