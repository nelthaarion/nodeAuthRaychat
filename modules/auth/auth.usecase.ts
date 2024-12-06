import { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { revokeToken } from "./auth.service";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;
        const created  = await AuthService.register(username, password, role);
        if (created){

            res.status(201).json({ message: "User registered" });
        } else {
            res.status(400).json({message: "User already registered"})
        }
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const token = await AuthService.login(username, password);
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};

export const logout = async (req:Request, res:Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Token is missing' });
    }
  
    try {
      await revokeToken(token);
      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to logout' });
    }
  }