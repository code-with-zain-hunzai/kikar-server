import express from "express";
import { getProfiles, getProfileById, getOwnProfile, updateOwnProfile, deleteOwnProfile } from "../../../controller/V1/userControllers/profileControllers";
import { auth, checkRole } from "../../../middleware/authMiddleware";
import { logout } from "../../../controller/V1/userControllers/authControllers";

const router = express.Router();

const allowedRoles = ['tourist', 'guide', 'hotel', 'transporter'];

router.get("/", auth, checkRole(allowedRoles), getProfiles);

router.get("/:type/:id", auth, checkRole(allowedRoles), getProfileById);

router.get("/me", auth, checkRole(allowedRoles), getOwnProfile);
router.put("/me", auth, checkRole(allowedRoles), updateOwnProfile);
router.delete("/me", auth, checkRole(allowedRoles), deleteOwnProfile);

router.post("/logout", logout);

export default router;