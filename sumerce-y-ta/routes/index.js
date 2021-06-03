const express = require("express");
const router = express.Router();
const products = require("./api/products");
const users = require("./api/users");
const mainController = require("../controllers/mainController");
const categorias = require("../routes/api/categorias");

router.get("/", mainController.index);
//router.get("/search", mainController.search);

router.use("/products", products);
router.use("/users", users);
router.use("/categorias", categorias);

module.exports = router;
