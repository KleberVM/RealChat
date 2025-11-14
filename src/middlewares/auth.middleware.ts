import jwt from "jsonwebtoken";
import {Request,Response,NextFunction} from "express";
import { TokenPayload } from "../interfaces/auth.interface";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "holaMundo2025";

// esto le dice a typeScript que el objeto request
// puede tener una propiedad opcional user
declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).send({
            message:"token no encontrado",
            status:401
        });
    }
    try {
        const payload = jwt.verify(token,jwtSecret) as TokenPayload;
        req.user = payload;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error:"token invalido"});
    }
}

