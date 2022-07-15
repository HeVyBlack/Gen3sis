import { Router } from "express";
import {
  renderSignin,
  renderSignUp,
  signIn,
  signUp,
} from "../controllers/users.controller";

const router = Router();

// ----| SigIn routes |----
// get
router.get("/signin", renderSignin);

// post
router.post("/signin", signIn);
export default router;

// ----| SigUp routes |----
// get
router.get("/signup", renderSignUp);

// post
router.post("/signup", signUp);
