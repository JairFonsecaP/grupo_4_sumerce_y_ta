const router = require("express").Router();
const userController = require("../../controllers/userController");
const avatar = require("../../middlewares/avatar");
const auth = require("../../middlewares/authMiddleware");
const noLoggin = require("../../middlewares/noLogginMiddleware");

router.get("/contacto", userController.contacto);
router.get("/login", auth, userController.login);
router.get("/registro", auth, userController.registro);
router.get("/profile", noLoggin, userController.profile);
router.get("/logout", userController.logout);
router.get("/editar", userController.editUser);
router.get("/editar_contrasena", userController.editPass);
router.post("/registro", avatar.single("photo"), userController.singup);
router.post("/login", userController.auth);

module.exports = router;
