const Items = require("../models/items");
const ItemStatus = require("../models/itemStatus");
const Categories = require("../models/categories");
const asyncHandler = require("express-async-handler");

//Home Page
exports.index = asyncHandler(async (req, res, next) => {
  //display total number of items
  const [itemNum, statusNum, stockNum, categoryNum] = await Promise.all([
    Items.countDocuments({}).exec(),
    ItemStatus.countDocuments({}).exec(),
    ItemStatus.countDocuments({ status: "In stock" }).exec(),
    Categories.countDocuments({}).exec(),
  ]);
  res.render("index", {
    title: "Shopping Cart",
    Item_count: itemNum,
    Status_count: statusNum,
    In_stock: stockNum,
    Category_count: categoryNum,
  });
});

// Display list of all items
exports.items_list = asyncHandler(async (req, res, next) => {
  const allItems = await Items.find().sort({ item_name: 1 }).exec();

  res.render("items_list", { title: "Items List", items_list: allItems });
});
