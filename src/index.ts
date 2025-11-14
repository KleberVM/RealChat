import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import routes from "./routes/route";
import bodyParser from "body-parser";
import "./config/passport.config";

dotenv.config();

const start = async () => {
    try {
        const app = express();
        const puerto = process.env.PORT || 3000;
        
        // middlewares
        app.use(bodyParser.json());
        app.use(passport.initialize());
        
        // rutas
        app.use("/", routes);
        
        app.listen(puerto, () => {
            console.log(`Servidor corriendo en el puerto: ${puerto}`);
        });
    } catch (error) {
        console.log("Error al iniciar el servidor:", error);
    }
};

start();
