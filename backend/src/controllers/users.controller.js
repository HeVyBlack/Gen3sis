import Users from "../models/Users";

Users;

// ----| Signin |---- //

export const renderSignin = (req, res) => {
  res.json({ username: test });
}; // --> renderSigin

export const signIn = (req, res) => {
  console.log(req.body);
  res.json("sigIn succesfully");
}; // --> sigIn

// ----| SignUp |---- //

export const renderSignUp = (req, res) => {
  res.json([
    { _id: "1234asdf986", user_name: "Drethlt" },
    { _id: "634hdf987", user_name: "Danilo" },
  ]);
}; // --> renderSignUp

export const signUp = async (req, res) => {
  console.log(req.body);
  res.json({ message: "SignUp Correct" });
}; // --> signUp (create user)
