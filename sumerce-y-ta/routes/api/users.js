const router = require("express").Router();
const userController = require("../../controllers/userController");

router.get("/contacto", userController.contacto);
router.get("/login", userController.login);
router.get("/registro", userController.registro);

module.exports = router;
