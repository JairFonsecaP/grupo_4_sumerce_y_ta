const router = require("express").Router();
const categoriaController = require("../../controllers/categoriasController");

router.get("/list", categoriaController.list);

module.exports = router;
