import express from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import { saveContact, getContacts, deleteContact } from "../controler/contact";

const router = express.Router();

router.post("/save", authMiddleware, saveContact);
router.get("/", authMiddleware, getContacts);
router.delete('/delete/:id',authMiddleware,deleteContact);

export default router;