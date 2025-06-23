import express from "express";
import { registerUser } from "../../../controller/V1/userControllers/registerController";

const router = express.Router();

router.post("/register", registerUser);

export default router;
