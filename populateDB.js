#! /usr/bin/env node

console.log(
  'This script populates some test items, categories, and itemStatus to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Items = require("./models/items");
const ItemStatus = require("./models/itemStatus");
const Categories = require("./models/categories");

const categories = [];
const items = [];
const itemStatus = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  await createItemStatus();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, category) {
  const categories = new Categories({ category: category });
  await categories.save();
  categories[index] = categories;
  console.log(`Added category: ${category}`);
}

async function ItemsCreate(
  index,
  item_name,
  description,
  price,
  quantity,
  status,
  categories
) {
  const itemsdetail = {
    item_name: item_name,
    description: description,
    price: price,
    quantity: quantity,
  };
  if (status != false) itemsdetail.status = status;
  if (categories != false) itemsdetail.categories = categories;

  const item = new Items(itemsdetail);

  await item.save();
  items[index] = item;
  console.log(`Added item: ${item_name}`);
}

async function itemStatusCreate(index, item_name, status) {
  const itemstatusdetail = {
    item_name: item_name,
  };
  if (status != false) itemstatusdetail.status = status;

  const item = new ItemStatus(itemstatusdetail);
  await item.save();
  itemStatus[index] = item;
  console.log(`Added status: ${status}`);
}

// We pass the index to the ...Create functions

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Food"),
    categoryCreate(1, "Beverage"),
    categoryCreate(2, "General"),
  ]);
}

async function createItems() {
  console.log("Adding Books");
  await Promise.all([
    ItemsCreate(
      0,
      "Samosa (Popular Indian Snack, #1)",
      "Samosas have become a popular street food and snack, enjoyed by people globally. They are not only a tasty treat but also a versatile dish with regional variations in ingredients and preparation methods. Whether as a savory snack or part of a meal, samosas are widely loved for their flavorful filling and satisfying crunch.",
      50.0,
      1,
      itemStatus[0],
      categories[0]
    ),
    ItemsCreate(
      1,
      "Tea (Popular Indian beverage, #2)",
      "Tea is a hot beverage that is prepared by pouring hot water over brewed black tea. It is one of the most popular beverages in India. It is also known as Camomile tea, Camomile, or Camomile syrup.",
      30.0,
      1,
      itemStatus[1],
      categories[1]
    ),
    ItemsCreate(
      2,
      "Beer (Popular beverage all over the world, #3)",
      "Beer is a beer or pale lager produced by the brewing process of fermentation of malted barley,which is then phased in through",
      100.0,
      1,
      itemStatus[2],
      categories[1]
    ),
  ]);
}
async function createItemStatus() {
  console.log("Adding Items Status");
  await Promise.all([
    itemStatusCreate(0, items[0], "In stock"),
    itemStatusCreate(1, items[1], "In stock"),
    itemStatusCreate(2, items[2], "Out of Stock"),
    itemStatusCreate(3, items[3], "Expired"),
  ]);
}
