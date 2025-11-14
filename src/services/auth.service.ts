import { AuthResponse, TokenPayload } from "../interfaces/auth.interface";
import {RegistroDto, LoginDto} from "../dtos/auth.dto";
import {PrismaClient} from '../generated/client/client';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET || "holaMundo2025";

export const registro = async(dto:RegistroDto)=>{
    /**https://www.npmjs.com/package/bcrypt/ */ 
    try {

        const userExistente= await prisma.user.findFirst({
            where: {
                OR:[
                    {username:dto.username},
                    {email:dto.email}
                ]
            }
        });

        if(userExistente){
            const data = {
                message:"el usuario ya existe",
                status:400
            }
            return data;
        }

        const { username, password, email } = dto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data:{
                username:username,
                email:email,
                password:hashedPassword
            },
            select: {
                 id: true,
                 username: true,
                 email: true 
            } // evitamos devolver la contraseña
        })
        
        const data = {
            message:"usuario registrado exitosamente",
            status:201,
            data:user
        }

    return data;

    } catch (error) {
        console.log(`error de servidor: ${error}`)
    }
}

export const login = async(dto:LoginDto)  =>{
    const user= await prisma.user.findUnique({
        where:{
            email:dto.email
        }
    })

    if(!user){
        throw new Error("el usuario no existe");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if(!isPasswordValid){
        throw new Error("contraseña invalida");
    }

    const payload: TokenPayload = {
        id:user.id,
        username:user.username,
        email:user.email
    }

    const token = jwt.sign(payload,jwtSecret,{
        expiresIn:"1h"
    })
    

    return{
        user:{
            id:user.id,
            username:user.username,
            email:user.email
        },
        token: token
    }
}