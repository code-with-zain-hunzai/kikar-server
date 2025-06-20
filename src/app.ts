import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import contactRouter from "./routes/V1/contactRoutes";
import destinationRoutes from "./routes/V1/destinationRoutes";
import travelPackageRoutes from "./routes/V1/travelPackageRoutes";
import adminRoutes from "./routes/V1/adminRoutes"

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["https://kikar.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400
  })
);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Contact Form API");
});

app.use("/V1", contactRouter);
app.use("/V1/destinations", destinationRoutes);
app.use("/V1", travelPackageRoutes);
app.use("/V1", adminRoutes);

export default app;