const mongoose = require("mongoose");
const Schema = mongoose.Schema();

//adding enum for categories such as food or beverages and so on
const categorySchema = new Schema({
  category: {
    type: String,
    enum: ["Food", "Beverages", "General"],
  },
});
