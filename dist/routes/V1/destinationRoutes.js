"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_middleware_1 = require("../../middleware/upload.middleware");
const destination_controller_1 = require("../../controller/V1/destination.controller");
const router = express_1.default.Router();
router.get("/", destination_controller_1.getAllDestinations);
router.get("/search", destination_controller_1.getAllDestinations);
router.get("/:id", destination_controller_1.getDestinationById);
router.post("/", upload_middleware_1.upload.single("image"), destination_controller_1.createDestination);
router.put("/:id", upload_middleware_1.upload.single("image"), destination_controller_1.updateDestination);
router.delete("/:id", destination_controller_1.deleteDestination);
exports.default = router;
//# sourceMappingURL=destinationRoutes.js.map