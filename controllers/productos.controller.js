const db = require("../db/db");

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
  const { nombre, precio, stock } = req.body;

  const sql = "INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)";
  db.query(sql, [nombre, precio, stock], (error, result) => {
    console.log(result);
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    const producto = { ...req.body, id: result.insertId };

    // req.body.id = result.insertId;

    res.json(producto);
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  const sql =
    "UPDATE productos SET nombre = ?, stock = ?, precio = ? WHERE id = ?";
  db.query(sql, [nombre, stock, precio, id], (error, result) => {
    // console.log(result);
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No existe el producto" });
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
