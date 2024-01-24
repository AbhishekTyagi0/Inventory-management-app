const mongoose = require("mongoose");
const Schema = mongoose.Schema();

//adding enum to add multiple status
const itemStatusSchema = new Schema({
  status: {
    type: String,
    enum: ["In stock", "Out of Stock", "expired"],
  },
});
