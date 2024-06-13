const express = require("express");
const router = express.Router();

const controller = require("../controllers/productos.controller");

// El prefijo /productos

router.get("/", controller.index);
// /productos/:id
router.get("/:id", controller.show);
router.post("/", controller.store);
// /productos/:id
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);

module.exports = router;
