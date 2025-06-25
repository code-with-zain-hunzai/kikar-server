import express from "express";
import { loginUser, logoutUser } from "../../../controller/V1/userControllers/signInController";

const router = express.Router();

router.post("/signin", loginUser);
router.post("/logout", logoutUser);

export default router;
