import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { nftmarket_user, login_nftmarket_user } from "../Interfaces/nftmarket_users.interface";

dotenv.config()

export interface ExtendedUserRequest extends Request{
    info?: login_nftmarket_user;
}


export const verifyToken( req: ExtendedUserRequest, res: Response, next: NextFunction) =>{
    try {
        const token = req.headers['token'] as string;

        if (!token) {
            return res.status(401).json({
                message: 'You do not have access',
            });
        }

        let data: login_nftmarket_user

        try {
            data = jwt.verify(token, process.env.SECRET as string) as nftmarket_user

            req.info = data
        } catch (error) {
            return res.status(403).json({
                error: 'Forbidden: Invalid token',
            });
        }

    } catch (error) {
        return res.json({
            error: error,
        });
    }
}