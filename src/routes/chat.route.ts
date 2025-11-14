import { Router } from "express";
import { 
    crearChatController, 
    obtenerChatsController, 
    obtenerChatController, 
    actualizarChatController, 
    eliminarChatController,
    agregarParticipanteController 
} from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { verificarMiembroDelChat } from "../middlewares/chat.middleware";

const router = Router();

// todas las rutas requieren autenticacion
router.post("/api/chats", authMiddleware, crearChatController);

router.get("/api/chats", authMiddleware, obtenerChatsController);

router.get("/api/chats/:chatId", authMiddleware, verificarMiembroDelChat, obtenerChatController);

router.put("/api/chats/:chatId", authMiddleware, verificarMiembroDelChat, actualizarChatController);

router.delete("/api/chats/:chatId", authMiddleware, verificarMiembroDelChat, eliminarChatController);

router.post("/api/chats/:chatId/participants", authMiddleware, verificarMiembroDelChat, agregarParticipanteController);

export default router;
