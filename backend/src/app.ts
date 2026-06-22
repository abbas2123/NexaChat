import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRouter from "./routes/authRoute";
import ProfileRoute from "./routes/profileRoute";
import ContactRoute from "./routes/contactRoutes";
import messageRoute from "./routes/messageRoute";
import ConversationRoute from "./routes/conversationRoutes";
import { initializeSocket } from "./socket/socket";
import http from "http";
import path from "path";
dotenv.config();
connectDB();



const app = express();

const server = http.createServer(app);

initializeSocket(server);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//routes
app.use("/api/auth", authRouter);
app.use("/api/user", ProfileRoute);
app.use("/api/contact", ContactRoute);
app.use("/api/conversation", ConversationRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
  console.log(`app is running ${PORT} http://localhost:${PORT}`);
});
