"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const contactRoutes_1 = __importDefault(require("./routes/V1/contactRoutes"));
const destinationRoutes_1 = __importDefault(require("./routes/V1/destinationRoutes"));
const travelPackageRoutes_1 = __importDefault(require("./routes/V1/travelPackageRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/V1/adminRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// CORS configuration
app.use((0, cors_1.default)({
    origin: ["https://kikar.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400
}));
// Serve static files from the uploads directory
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
app.get("/", (req, res) => {
    res.send("Welcome to the Contact Form API");
});
app.use("/V1", contactRoutes_1.default);
app.use("/V1/destinations", destinationRoutes_1.default);
app.use("/V1", travelPackageRoutes_1.default);
app.use("/V1", adminRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map