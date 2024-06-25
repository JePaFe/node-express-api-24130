const jwt = require("jsonwebtoken");

const users = require("../models/user.model");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res
      .status(403)
      .send({ auth: false, message: "No se proveyó un token" });

  // "Bearer eyJhbGciOi..."

  const token = authHeader.split(" ")[1];

  if (!token)
    return res.status(403).send({ auth: false, message: "Malformed token." });

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    console.log(error, decoded);
    if (error)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // const user = users.find((u) => u.id == decoded.id);
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    console.log(decoded);
    req.userId = decoded.id;

    next();
  });
};
