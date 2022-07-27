import jwt from "jsonwebtoken";
import Users from "../models/Users";

export const verifyToken = async (req, res, next) => {
  try {
    // Search for token in headers
    const token = req.headers["authorization"];
    // If token is not found, send a json with a message as response
    if (!token) return res.json({ text: "No autorizado" });

    //Decode the token
    const decode = jwt.verify(token, process.env.SECRET_WORD);

    req.userId = decode.id;

    // Check if user with id provided, exist
    const user = await Users.findById(req.userId, { password: 0 });
    if (!user) return res.json({ text: "Usuario no encontrado" });
    next();
  } catch (err) {
    // If any error, send a json with a message as response
    res.json({ text: "Sin token" });
  }
};
