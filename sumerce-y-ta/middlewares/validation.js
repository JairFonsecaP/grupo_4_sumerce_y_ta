const { body } = require("express-validator");

const validation = {
  register: [
    body("name").notEmpty().withMessage("Tienes que ingresar tu nombre"),
    body("phone")
      .notEmpty()
      .withMessage("Tienes que ingresar tu numero de telefono"),
    body("region").notEmpty().withMessage("Selecciona una región"),
    body("comuna")
      .notEmpty()
      .withMessage("Selecciona la comuna en la que vives"),
    body("email")
      .notEmpty()
      .withMessage("Tienes que ingresar un email")
      .bail()
      .isEmail()
      .withMessage("Ingresa un email valido"),
    body("emailConfirmation")
      .notEmpty()
      .withMessage("Tienes que confirmar tu email")
      .bail()
      .isEmail()
      .withMessage("Ingresa un email valido")
      .bail()
      .custom((value, { req }) => {
        if (req.body.email != req.body.emailConfirmation) {
          throw new Error("El email debe coincidir");
        }
        return true;
      }),

    body("password")
      .notEmpty()
      .withMessage("Tienes que escribir una contraseña")
      .bail()
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener minimo 6 caracteres"),

    body("passwordConfirmation")
      .notEmpty()
      .withMessage("Tienes que confirmar la contraseña")
      .bail()
      .custom((value, { req }) => {
        if (req.body.password != req.body.passwordConfirmation) {
          throw new Error("Las contraseñas deben coincidir");
        }
        return true;
      }),
  ],
  updatePassword: [
    body("password")
      .notEmpty()
      .withMessage("Tienes que escribir una contraseña")
      .bail()
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener minimo 6 caracteres"),

    body("passwordConfirmation")
      .notEmpty()
      .withMessage("Tienes que confirmar la contraseña")
      .bail()
      .custom((value, { req }) => {
        if (req.body.password != req.body.passwordConfirmation) {
          throw new Error("Las contraseñas deben coincidir");
        }
        return true;
      }),
  ],
  product: [
    body("name").notEmpty().withMessage("Debe darle un nombre a su producto"),
    body("description").notEmpty().withMessage("Agregue una descripcion"),
    body("categories").notEmpty().withMessage("Seleccione una categoria"),
    body("sizes").notEmpty().withMessage("Seleccione al menos una talla"),
    body("colors").notEmpty().withMessage("Seleccione al menos un color"),
    body("price")
      .notEmpty()
      .withMessage("Ingrese el precio del producto")
      .bail()
      .custom((value, { req }) => {
        console.log(value);
        if (isNaN(parseFloat(req.body.price) + 5)) {
          throw new Error("Debe ingresar un valor númerico");
        }
        return true;
      }),
  ],
};

module.exports = validation;
