const router = require("express").Router();
const userController = require("../../controllers/userController");
const avatar = require("../../middlewares/avatar");

router.get("/contacto", userController.contacto);
router.get("/login", userController.login);
router.get("/registro", userController.registro);
router.post("/registro", avatar.single("photo"), userController.singup);
router.post("/login", userController.auth);
router.get("/profile", userController.profile);

module.exports = router;
