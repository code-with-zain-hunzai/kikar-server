"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../../controller/V1/contactController");
const router = express_1.default.Router();
router.post("/contact", contactController_1.submitContactForm);
router.get("/contact", contactController_1.getAllContacts);
exports.default = router;
//# sourceMappingURL=contactRoutes.js.map