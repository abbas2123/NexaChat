import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRouter from "./routes/authRoute";
import chatRoute from "./routes/messageRoute";
import ProfileRoute from "./routes/profileRoute";
import ContactRoute from "./routes/contactRoutes";
import path from "path";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;
console.log("sever is running");
console.log("PORT =", PORT);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/auth", authRouter);
app.use("/api/message", chatRoute);
app.use("/api/user", ProfileRoute);
app.use("/api/contact", ContactRoute);

app.listen(PORT, () => {
  console.log(`app is running ${PORT} http://localhost:${PORT}`);
});
