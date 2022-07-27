import jwt from "jsonwebtoken";
import Users from "../models/Users";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.json({ text: "No autorizado" });

    const decode = jwt.verify(token, process.env.SECRET_WORD);

    req.userId = decode.id;

    const user = await Users.findById(req.userId, { password: 0 });
    if (!user) return res.json({ text: "Usuario no encontrado" });
    console.log(token);
    next();
  } catch (err) {
    res.json({ text: "Sin token" });
  }
};
