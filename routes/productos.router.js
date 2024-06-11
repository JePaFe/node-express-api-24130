const express = require("express");
const router = express.Router();

const productos = [
  { id: 1, nombre: "Producto Nro. 1" },
  { id: 3, nombre: "Producto Nro. 3" },
  { id: 4, nombre: "Producto Nro. 4" },
  { id: 7, nombre: "Producto Nro. 7" },
];

router.get("/", (req, res) => {
  res.json(productos);
});

// /productos/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const producto = productos.find((elemento) => elemento.id == id);
  // console.log(producto);
  if (!producto) {
    return res.status(404).json({ error: "No se encontró el producto" });
  }

  res.json(producto);
});

router.post("/", (req, res) => {
  // console.log(req.body, productos[productos.length - 1], productos.length);

  const id = productos[productos.length - 1].id + 1;

  const producto = {
    id: id,
    nombre: req.body.nombre,
  };

  productos.push(producto);

  res.status(201).send(producto);
});

// /productos/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  const producto = productos.find((elemento) => elemento.id == id);
  // console.log(producto);
  if (!producto) {
    return res.status(404).json({ error: "No se encontró el producto" });
  }

  producto.nombre = nombre;

  res.json(producto);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const producto = productos.find((elemento) => elemento.id == id);
  if (!producto) {
    return res.status(404).json({ error: "No se encontró el producto" });
  }

  const productoIndex = productos.findIndex((elemento) => elemento.id == id);
  productos.splice(productoIndex, 1);

  res.send(producto);
});

module.exports = router;
