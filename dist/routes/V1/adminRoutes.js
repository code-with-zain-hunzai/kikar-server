"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../../controller/V1/admin.controller");
const admin_schema_1 = require("../../schema/admin.schema");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const router = express_1.default.Router();
router.post('/login', (0, validate_middleware_1.validate)(admin_schema_1.loginAdminSchema), admin_controller_1.loginAdmin);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map