const db = require("../db/db");

const fs = require("fs");
const path = require("path");

const index = (req, res) => {
  const sql = "SELECT * FROM productos";
  db.query(sql, (error, rows) => {
    // console.log(rows);
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    res.json(rows);
  });
};

const show = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM productos WHERE id = ?";
  db.query(sql, [id], (error, rows) => {
    // console.log(rows);
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    

    if (rows.length === 0) {
      return res.status(404).json({ message: "No existe el producto" });
    }

    res.json(rows[0]);
  });
};

const store = (req, res) => {
  // console.log(req.file);

  const { filename } = req.file;
  const { nombre, precio, stock } = req.body;

  const sql =
    "INSERT INTO productos (nombre, precio, stock, imagen) VALUES (?, ?, ?, ?)";
  db.query(sql, [nombre, precio, stock, filename], (error, result) => {
    // console.log(result);
    if (error) {
      // console.log(error);
      fs.unlinkSync(path.join(__dirname, "../public/uploads", filename));
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    const producto = { ...req.body, id: result.insertId };

    // req.body.id = result.insertId;

    res.json(producto);
  });
};

const update = (req, res) => {
  // console.log(req.file);

  let sql =
    "UPDATE productos SET nombre = ?, stock = ?, precio = ? WHERE id = ?";

  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  const values = [nombre, stock, precio];

  if (req.file) {
    const { filename } = req.file;
    sql =
      "UPDATE productos SET nombre = ?, stock = ?, precio = ?, imagen = ? WHERE id = ?";
    values.push(filename);
  }

  values.push(id);

  db.query(sql, values, (error, result) => {
    // console.log(result);
    if (error) {
      console.log(error);
      // Borra imagen subida
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (result.affectedRows === 0) {
      // Borra imagen subida
      return res.status(404).json({ message: "No existe el producto" });
    }

    if (result.affectedRows === 1) {
      // fs.unlink a la imagen anterior
    }

    const producto = { ...req.body, ...req.params };

    res.json(producto);
  });
};

const destroy = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM productos WHERE id = ?";
  db.query(sql, [id], (error, result) => {
    // console.log(result);
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No existe el producto" });
    }

    res.json({ mensaje: "Registro borrado" });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
