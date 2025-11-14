import {Router} from "express";

import authRoutes from "./auth.routes";
import googleRoutes from "./google.route";
import healthCheckRoutes from "../helthCheck/healthCheck.routes";
import chatRoutes from "./chat.route";
import messageRoutes from "./message.route";
import error404Routes from "./error404.route";

const router = Router();

router.use("/", authRoutes);
router.use("/", googleRoutes);
router.use("/", healthCheckRoutes);
router.use("/", chatRoutes);
router.use("/", messageRoutes);
router.use("/", error404Routes);

export default router;
