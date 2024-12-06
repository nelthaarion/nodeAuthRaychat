import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    try {
         req.user = jwt.verify(token, process.env.JWT_SECRET || "secret");
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
