const router = require("express").Router();
const userController = require("../../controllers/userController");
const avatar = require("../../middlewares/avatar");
const validation = require("../../middlewares/validation");
const auth = require("../../middlewares/authMiddleware");
const noLoggin = require("../../middlewares/noLogginMiddleware");

router.get("/contacto", userController.contacto);
router.get("/login", auth, userController.login);
router.get("/registro", auth, userController.registro);
router.get("/profile", noLoggin, userController.profile);
router.get("/logout", noLoggin, userController.logout);
router.get("/editar", noLoggin, userController.editUser);
router.get(
  "/editar_contrasena",
  noLoggin,

  userController.editPass
);
//Api lista de usuarios
router.get("/", userController.userAPI.list);
//Api detalle de un usuario
router.get("/:id", userController.userAPI.findUser);

router.post(
  "/registro",
  auth,
  avatar.single("photo"),
  validation.register,
  userController.singup
);
router.post("/login", auth, userController.auth);

router.put(
  "/editar",
  noLoggin,
  avatar.single("photo"),
  userController.updateUser
);
router.put(
  "/editar_contrasena",
  noLoggin,
  validation.updatePassword,
  userController.updatePassword
);
//Api lista de usuarios
router.get("/", userController.userAPI.list);
//Api detalle de un usuario
router.get("/:id", userController.userAPI.findUser);



module.exports = router;
