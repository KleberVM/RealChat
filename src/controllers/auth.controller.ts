import {Request,Response} from "express";

import { Validate } from "class-validator";

import {RegistroDto,LoginDto} from "../dtos/auth.dto";

import {registro,login} from "../services/auth.service";


export const registroController = async(req:Request,res:Response)=>{
    const dato = req.body;

    try {
        const {username,email,password} = req.body;
        const user = await registro({username,email,password});
        res.status(201).send({
            data:user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"ocurrio un error al registrar el usuario",
            status:500,
            data:req.body
        });
    }
}
export const loginController = async(req:Request,res:Response)=>{
    try {
        const {email,password} = req.body;
        const user = await login({email,password});
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("ocurrio un error al iniciar sesión");
    }
}

