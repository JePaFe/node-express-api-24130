require("dotenv").config();

const express = require("express");
const app = express();

const path = require("path");

// Middleware para archivos estáticos y públicos
app.use(express.static(path.join(__dirname, "public")));

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const productosRouter = require("./routes/productos.router.js");
// app.use("/productos", productosRouter);

app.use("/productos", require("./routes/productos.router"));

app.use("/auth", require("./routes/auth.router"));

// Ruta principal, la pagina de inicio
// http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Hola Express");
});

// Esta ruta es para mostrar un archivo en una carpeta privada
// Puedo mas adelante controlar quien tiene acceso
app.get("/factura", (req, res) => {
  // login
  res.sendFile(path.join(__dirname, "private", "factura.html"));
});

// En esta ruta se envia un archivo JSON
app.get("/frutas", (req, res) => {
  // Con el query se pueden enviar cadenas de consultas
  // Ejemplo: /frutas?order=nombre&limit=5
  console.log(req.query);
  res.sendFile(path.join(__dirname, "frutas.json"));
});

app.get("/frutas/:id", (req, res) => {
  // Con los params se puede obtener parámetros definidos en la ruta
  console.log(req.params.id);
  res.send("Una fruta con el id: " + req.params.id);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
