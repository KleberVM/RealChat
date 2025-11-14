import { Router } from "express";
import passport from "passport";
import { googleCallbackController } from "../controllers/google.controller";

const router = Router();
// hola mundo
// ruta para iniciar autenticacion con Google
router.get("/api/auth/google", 
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);
// callback de Google OAuth
router.get("/api/auth/google/callback", 
    passport.authenticate("google", { 
        session: false,
        failureRedirect: "/api/auth/login"
    }),
    googleCallbackController
);

export default router;
