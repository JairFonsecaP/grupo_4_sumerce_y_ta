const router = require("express").Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.index);
router.get("/carrito", mainController.carrito);
router.get("/categorias", mainController.categorias);
router.get("/contacto", mainController.contacto);
router.get("/login", mainController.login);
router.get("/producto", mainController.producto);
router.get("/registro", mainController.registro);

module.exports = router;
