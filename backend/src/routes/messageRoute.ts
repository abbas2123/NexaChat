import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getMessages, sendMessage } from "../controler/messageController";
const router = Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:conversationId", authMiddleware, getMessages);

export default router;
