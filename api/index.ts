// /api/index.ts
import serverlessExpress from "@vendia/serverless-express";
import app from "../src/app";
import { connectDB } from "../src/config/db"

(async () => {
    await connectDB();
  })();

export default serverlessExpress({ app });
