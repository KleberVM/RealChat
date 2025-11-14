import { Router } from "express";
import { 
    crearMensajeController, 
    obtenerMensajesController, 
    obtenerMensajeController, 
    actualizarMensajeController, 
    eliminarMensajeController 
} from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { verificarMiembroDelChat } from "../middlewares/chat.middleware";

const router = Router();

// todas las rutas requieren autenticacion
router.post("/api/messages", authMiddleware, crearMensajeController);

router.get("/api/chats/:chatId/messages", authMiddleware, verificarMiembroDelChat, obtenerMensajesController);

router.get("/api/messages/:messageId", authMiddleware, obtenerMensajeController);

router.put("/api/messages/:messageId", authMiddleware, actualizarMensajeController);

router.delete("/api/messages/:messageId", authMiddleware, eliminarMensajeController);

export default router;
