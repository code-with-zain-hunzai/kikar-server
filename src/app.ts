import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
//  import contactRouter from "./routes/V1/adminRoutes/contactRoutes";
// import destinationRoutes from "./routes/V1/adminRoutes/destinationRoutes";
// import travelPackageRoutes from "./routes/V1/adminRoutes/travelPackageRoutes";
// import adminRoutes from "./routes/V1/adminRoutes/adminRoutes"
// import signInRoutes from "./routes/V1/usersRoutes/signInRoutes";
// import registerRoutes from "./routes/V1/usersRoutes/registerRoutes";
// import profileRoutes from "./routes/V1/usersRoutes/profileRoutes";

dotenv.config();

const app = express();

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

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Contact Form API");
});

app.get("/hello",(req,res)=>{
  res.send("Welcome to the hello routes")
})

//  app.use("/V1", contactRouter);
// app.use("/V1/destinations", destinationRoutes);
// app.use("/V1", travelPackageRoutes);
// app.use("/V1", adminRoutes);
// app.use("/V1", signInRoutes);
// app.use("/V1", registerRoutes);
// app.use("/V1/profiles", profileRoutes);

export default app;