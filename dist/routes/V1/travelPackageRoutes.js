"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const travelPackage_controller_1 = require("../../controller/V1/travelPackage.controller");
const router = express_1.default.Router();
// Debug middleware for this router
router.use((req, res, next) => {
    console.log('Travel Package Route:', req.method, req.originalUrl);
    console.log('Request Body:', req.body);
    next();
});
// Base routes
router.get("/packages", travelPackage_controller_1.getAllTravelPackages);
router.post("/packages", travelPackage_controller_1.createTravelPackage);
// ID specific routes
router.get("/packages/:id", travelPackage_controller_1.getTravelPackageById);
router.put("/packages/:id", travelPackage_controller_1.updateTravelPackage);
router.delete("/packages/:id", travelPackage_controller_1.deleteTravelPackage);
// Additional routes
router.get("/packages/search", travelPackage_controller_1.getAllTravelPackages);
router.get("/packages/featured", travelPackage_controller_1.getAllTravelPackages);
exports.default = router;
//# sourceMappingURL=travelPackageRoutes.js.map