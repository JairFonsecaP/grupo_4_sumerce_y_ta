const router = require("express").Router();
const productController = require("../../controllers/productsController");
const upload = require("../../middlewares/photoUp");
const noLoggin = require("../../middlewares/noLogginMiddleware");

router.get("/admproducto", noLoggin, productController.admproducto);
router.get("/create", noLoggin, productController.create);
router.post(
  "/admproducto/create",
  noLoggin,
  upload.single("photo"),
  productController.store
);
router.get("/producto/:id", productController.producto);
router.get("/categorias/:category", productController.categorias);
router.get("/carrito", productController.carrito);
router.get("/edit/:id", noLoggin, productController.edit);
router.put(
  "/edit/:id",
  noLoggin,
  upload.single("photo"),
  productController.update
);
router.delete("/delete/:id", noLoggin, productController.delete);

module.exports = router;
