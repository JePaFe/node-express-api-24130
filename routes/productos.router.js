const express = require("express");
const router = express.Router();

const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, path.resolve(__dirname, "../uploads"));
    // cb(null, path.join(__dirname, "../uploads"));
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;

    const mimetype = fileTypes.test(file.mimetype);

    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("No es un archivo permitido");
  },
  limits: { fileSize: 1024 * 1024 * 1 },
});

const controller = require("../controllers/productos.controller");

// El prefijo /productos

router.get("/", controller.index);
// /productos/:id
router.get("/:id", controller.show);

router.post("/", upload.single("imagen"), controller.store);
// /productos/:id
router.put("/:id", upload.single("imagen"), controller.update);

router.delete("/:id", controller.destroy);

module.exports = router;
