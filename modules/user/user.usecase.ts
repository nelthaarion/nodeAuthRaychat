import { Request, Response } from "express";
import * as UserService from "./user.service";

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getUserById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        await UserService.updateUser(userId, req.body);
        res.status(200).json({ message: "User updated" });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        await UserService.deleteUser(userId);
        res.status(200).json({ message: "User deleted" });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};
