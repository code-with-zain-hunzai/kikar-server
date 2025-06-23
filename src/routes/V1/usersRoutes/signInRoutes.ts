import express from "express";
import { loginUser } from "../../../controller/V1/userControllers/signInController";

const router = express.Router();

router.post("/signin", loginUser);

export default router;
