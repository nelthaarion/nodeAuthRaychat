import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../configs/mongo";
import { connectRedis } from "../configs/redis";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import { sessionMiddleware } from '../middlewares/session';

import helmet from "helmet";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
//use helemt for security
app.use(helmet());
app.use(sessionMiddleware);

(async () => {
    await connectDB();
    await connectRedis();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})();
