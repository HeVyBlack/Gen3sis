import { validate } from "email-validator";
import User from "../models/Users";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { config } from "dotenv";
// ----| Signin |---- //

export const renderSignin = (req, res) => {
  res.json({ username: "test" });
}; // --> renderSigin

export const signIn = async (req, res) => {
  const msgs = [];
  const { email, password } = req.body;

  // Check req.body
  if (validate(email) == false) {
    msgs.push({ text: "Correo inválido" });
  }
  if (String(password).length < 4) {
    msgs.push({ text: "Contraseña debe tener al menos 4 caracteres" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    msgs.push({ text: "Correo no encontrado" });
  } else if (user) {
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      msgs.push({ text: "Contraseña incorrecta" });
    }
  }
  if (msgs.length > 0) {
    res.json(msgs);
  } else {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_WORD, {
      expiresIn: 86400,
    });
    res.json({ token });
  }
}; // --> sigIn

// ----| SignUp |---- //

export const renderSignUp = (req, res) => {
  res.json([
    { _id: "1234asdf986", user_name: "Drethlt" },
    { _id: "634hdf987", user_name: "Danilo" },
  ]);
}; // --> renderSignUp

export const signUp = async (req, res) => {
  // Destructure req.body
  const msgs = [];
  const {
    user_name,
    email,
    password: { password: password, confirm: confirm },
    type,
  } = req.body;

  // ---> Check req.body <---
  if (String(password).length < 4) {
    msgs.push({ text: "Contraseña debe tener al menso 4 caracteres" });
  }

  if (password != confirm) {
    msgs.push({ text: "Contraseñas no coinciden" });
  }

  if (validate(email) == false) {
    msgs.push({ text: "Correo inválido" });
  }

  if (toString(user_name).length < 4) {
    msgs.push({ text: "Usuario debe tener al menos 4 caracteres" });
  }

  if (type != "engineer" && type != "client") {
    msgs.push({ text: "Tipo de cliente inválido" });
  }
  if (msgs.length > 0) {
    res.json(msgs);
  } else {
    // Check if email is already in use
    const findUser = await User.findOne({ user_name: user_name });
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      msgs.push({ text: "Correo ya está en uso" });
    }

    if (findUser) {
      msgs.push({ text: "Usuario ya está en uso" });
    }
    if (msgs.length > 0) {
      res.json(msgs);
    } else {
      const newUser = new User({ user_name, email, password, type });
      newUser.password = await newUser.encryptPassword(String(password));
      await newUser.save();
      res.send(true);
    }
  }
}; // --> signUp (create user)
