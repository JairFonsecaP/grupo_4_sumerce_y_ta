const router = require("express").Router();
const productController = require("../../controllers/productsController");
const upload = require("../../middlewares/photoUp");

router.get("/admproducto", productController.admproducto);
router.post(
  "/admproducto/create",
  upload.single("photo"),
  productController.store
);
router.post("/admproducto/edit", productController.edit);

router.get("/producto/:id", productController.producto);
router.get("/categorias/:category", productController.categorias);
router.get("/carrito", productController.carrito);

module.exports = router;
