import { validate } from "email-validator";
import User from "../models/Users";

// ----| Signin |---- //

export const renderSignin = (req, res) => {
  res.json({ username: test });
}; // --> renderSigin

export const signIn = (req, res) => {
  const errors = [];
  const { email, password } = req.body;

  // Check req.body
  if (validate(email) == false) {
    errors.push({ text: "Invalidate email" });
  }
  if (String(password).length < 4) {
    errors.push({ text: "Password must be at least 4 characters " });
  }

  res.json(errors);
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
  const errors = [];
  const {
    user_name,
    email,
    password: { password: password, confirm: confirm },
    type,
  } = req.body;

  // Check req.body
  if (String(password).length < 4) {
    errors.push({ text: "Password must be at least 4 characters " });
  }

  if (password != confirm) {
    errors.push({ text: "The password doesn't match" });
  }

  if (validate(email) == false) {
    errors.push({ text: "Invalidate email" });
  }

  if (toString(user_name).length < 4) {
    errors.push({ text: "User Name must be at least 4 characters" });
  }

  if (type != "engineer" && type != "client") {
    errors.push({ text: "Invalid type client" });
  }
  if (errors.length > 0) {
    res.json(errors);
  } else {
    // Check if email is already in use
    const findUser = await User.findOne({ user_name: user_name });
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      errors.push({ text: "Email already taken" });
      res.json(errors);
    }

    if (findUser) {
      errors.push({ text: "User name already taken" });
      res.json(errors);
    } else {
      const newUser = new User({ user_name, email, password, type });
      newUser.password = await newUser.encryptPassword(String(password));
      await newUser.save();
      res.json("User created");
    }
  }
}; // --> signUp (create user)
