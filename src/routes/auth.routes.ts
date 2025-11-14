import { Router } from "express";
import { loginController, registroController } from "../controllers/auth.controller";

const router = Router();

router.post("/api/auth/registro", registroController);

router.post("/api/auth/login", loginController);

export default router;