import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getMessage, GetRecentChats } from "../controler/chatControler";
const router = Router();

router.get('/:chatId',getMessage);
router.get('/recent-chats',GetRecentChats);

export default router;
