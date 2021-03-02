const router = require("express").Router();
const productController = require("../../controllers/productsController");

router.get("/admproducto", productController.admproducto);
router.post("/admproducto", productController.store);

router.get("/producto", productController.producto);
router.get("/categorias/:category", productController.categorias);
router.get("/carrito", productController.carrito);

module.exports = router;
