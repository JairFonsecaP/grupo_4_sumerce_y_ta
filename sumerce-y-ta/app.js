const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const router = require("./routes/index");
const session = require("express-session");
const cookieParser = require("cookie-parser");
<<<<<<< HEAD
const cors = require("cors");

=======
const cors = require('cors');
>>>>>>> 1e4ab35dcf0221331d4bfbf1692f261288a668ac
const userPermissions = require("./middlewares/userPermissions");

app.use(cors());
const port = 3000;
app.use(cors());
app.use(
  session({
    secret: "Es un secreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());
app.use(userPermissions);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use("/", router);

app.use("/static", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log("Server up at port " + port);
});
