import express from "express";
import healthCheckRoutes from "./helthCheck/healthCheck.routes";
import dotenv from "dotenv";
import { authMiddleware } from "./middlewares/auth.middleware";
import authRoutes from "./routes/auth.routes";
import bodyParser from "body-parser";

dotenv.config();


const start= async () => {
    try {
        const app = express();
        const puerto = process.env.PORT || 3000;
        app.use(bodyParser.json());
        app.use("/", healthCheckRoutes);
        app.use("/", authRoutes);
        app.listen(puerto,()=>{
            console.log(`Servidor corriendo en el puerto:  ${puerto}`);
        })
    } catch (error) {
        console.log("Error al iniciar el servidor:",error);
    }
}


start();
