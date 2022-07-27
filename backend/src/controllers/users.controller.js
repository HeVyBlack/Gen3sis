import { validate } from "email-validator";
import User from "../models/Users";
import jwt from "jsonwebtoken";
import "dotenv/config";

// ----| Signin |---- //

export const renderSignin = (req, res) => {
  res.json({ username: "test" });
}; // --> renderSigin

export const signIn = async (req, res) => {
  // Array for posible messages
  const msgs = [];
  // Destructure req.body
  const { email, password } = req.body;

  // Check req.body

  if (validate(email) == false) {
    msgs.push({ text: "Correo inválido" });
  } // <-- Check if email is validate
  if (String(password).length < 4) {
    msgs.push({ text: "Contraseña debe tener al menos 4 caracteres" });
  } // <-- check if password if validate

  // Find user with req's email
  const user = await User.findOne({ email: email });
  if (!user) {
    // If user not found, push a message
    msgs.push({ text: "Correo no encontrado" });
  } else if (user) {
    const isMatch = await user.matchPassword(password);
    // If pass is wrong, push a message
    if (!isMatch) {
      msgs.push({ text: "Contraseña incorrecta" });
    }
  }
  // If array msgs has messages inside, send it as response
  if (msgs.length > 0) {
    res.json(msgs);
  } else {
    // Set token info
    const token = jwt.sign({ id: user._id }, process.env.SECRET_WORD, {
      expiresIn: 86400,
    });
    // Send token
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
    // Check if email and user are already in user
    const findUser = await User.findOne({ user_name: user_name });
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      msgs.push({ text: "Correo ya está en uso" });
    }

    if (findUser) {
      msgs.push({ text: "Usuario ya está en uso" });
    }
    if (msgs.length > 0) {
      // If array msgs has message inside, send it as response
      res.json(msgs);
    } else {
      // Create user
      const newUser = new User({ user_name, email, password, type });
      newUser.password = await newUser.encryptPassword(String(password));
      await newUser.save();
      // Send "true" as response, for frontend know that user is created
      res.send(true);
    }
  }
}; // --> signUp (create user)
