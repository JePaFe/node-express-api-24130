const express = require("express");
const app = express();

// http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Hola Express");
});

const PORT = 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
