const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//adding enum to add multiple status
const itemStatusSchema = new Schema({
  item_name: [
    {
      type: Schema.Types.ObjectId,
      ref: "Items",
      required: true,
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["In stock", "Out of Stock", "Expired"],
  },
});

itemStatusSchema.virtual("url").get(function () {
  return `/itemStatus/${this._id}`;
});

module.exports = mongoose.model("ItemStatus", itemStatusSchema);
