const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const itemsController = require("../controllers/itemsController");
const itemStatusController = require("../controllers/itemStatusController");

router.get("/", itemsController.index);
router.get("/items", itemsController.items_list);

module.exports = router;
