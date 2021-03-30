const router = require("express").Router();
const userController = require("../../controllers/userController");
const avatar = require("../../middlewares/avatar");
const auth = require("../../middlewares/authMiddleware");
const noLoggin = require("../../middlewares/noLogginMiddleware");

router.get("/contacto", userController.contacto);
router.get("/login", auth, userController.login);
router.get("/registro", auth, userController.registro);
router.get("/profile", noLoggin, userController.profile);
router.get("/logout", noLoggin, userController.logout);
router.get("/editar", noLoggin, userController.editUser);
router.get("/editar_contrasena", noLoggin, userController.editPass);

router.post("/registro", auth, avatar.single("photo"), userController.singup);
router.post("/login", auth, userController.auth);

router.put(
  "/editar",
  noLoggin,
  avatar.single("photo"),
  userController.updateUser
);
router.put("/editar_contrasena", noLoggin, userController.updatePassword);

module.exports = router;
