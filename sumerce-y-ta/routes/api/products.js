const router = require("express").Router();
const productController = require("../../controllers/productsController");

router.get("/admproducto", productController.admproducto);
router.post("/admproducto", productController.store);
router.get("/categorias/:category", productController.categorias);
router.get("/producto/:id", productController.producto);
router.get("/carrito", productController.carrito);

module.exports = router;