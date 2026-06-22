import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getConversations,
  getOrCreateConversation,
} from "../controler/conversationController";
const router = Router();
console.log("conversationRoutes loaded");

router.get("/:userId", authMiddleware, getOrCreateConversation);

router.get("/", authMiddleware, getConversations);

export default router