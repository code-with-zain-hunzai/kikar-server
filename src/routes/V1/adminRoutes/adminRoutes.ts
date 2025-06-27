import express from 'express';
import { loginAdmin, logoutAdmin } from '../../../controller/V1/dashboardControllers/admin.controller';
import { loginAdminSchema } from '../../../schema/admin.schema';
import { validate } from '../../../middleware/validate.middleware';
import { adminAuth } from '../../../middleware/authMiddleware';

const router = express.Router();

router.post('/login', validate(loginAdminSchema), loginAdmin);
router.post('/logout', logoutAdmin);

router.get('/dashboard', adminAuth, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!', user: req.user });
});

export default router;

