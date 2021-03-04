const router = require("express").Router();
const productController = require("../../controllers/productsController");
const upload = require("../../middlewares/photoUp");

router.get("/admproducto", productController.admproducto);
router.get("/create", productController.create);
router.post(
  "/admproducto/create",
  upload.single("photo"),
  productController.store
);
router.get("/producto/:id", productController.producto);
router.get("/categorias/:category", productController.categorias);
router.get("/carrito", productController.carrito);
router.get("/edit/:id", productController.edit);
router.put("/edit/:id", upload.single("photo"), productController.update);

module.exports = router;
