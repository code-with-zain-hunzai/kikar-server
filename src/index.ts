// import app from "./app";
// import { connectDB } from './config/db';

// const PORT = process.env.PORT || 5000;

// connectDB();

// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }


// src/index.ts
// import { connectDB } from "./config/db";
// import app from "./app";
// import serverlessExpress from "@vendia/serverless-express";

// // Connect to database once
// connectDB();
// // Export the handler for Vercel
// export default serverlessExpress({ app });

import app from "../src/app";
import { connectDB } from "../src/config/db";

connectDB();

export default function handler(req: any, res: any) {
  return app(req, res);
}
