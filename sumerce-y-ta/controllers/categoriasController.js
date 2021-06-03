const db = require("../database/models");

exports.list = async (req, res) => {
  const category = await db.Categories.findAll(
    { include: [{ association: "products" }] },
    { raw: true, neft: true }
  );
  const count = category.length;

  res.status(200).json({ count, category });
};
