import express from 'express';
import { loginAdmin } from '../../controller/V1/admin.controller';
import { loginAdminSchema } from '../../schema/admin.schema';
import { validate } from '../../middleware/validate.middleware';

const router = express.Router();

router.post('/login', validate(loginAdminSchema), loginAdmin);

export default router;

