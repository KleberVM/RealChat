import { Request, Response } from "express";
import { generarTokenGoogle } from "../services/google.service";

export const googleCallbackController = (req: Request, res: Response) => {
    try {
        const user = req.user;
        
        if (!user) {
            return res.status(401).send({
                message: "error de autenticacion",
                status: 401
            });
        }
        
        // generamos el token JWT 
        const resultado = generarTokenGoogle(user);
        
        // enviamos la respuesta con el token
        res.status(200).send({
            message: "autenticacion con Google exitosa",
            status: 200,
            data: resultado
        });
    } catch (error) {
        console.log("error en googleCallbackController:", error);
        res.status(500).send({
            message: "ocurrio un error durante la autenticacion con Google",
            status: 500
        });
    }
};
