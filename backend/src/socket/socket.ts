import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { MessageService } from "../services/messageService";
import { MessageRepository } from "../repositories/message.repo";
let io: Server;
const messageRepo = new MessageRepository();

export const initializeSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId: string) => {
      socket.join(userId);
      console.log(`${userId} joined`);
    });

    socket.on("join_conversation", (conversationId: string) => {
      socket.join(conversationId);

      console.log(`joined conversation ${conversationId}`);
    });
    socket.on("leave_conversation", (conversationId: string) => {
      socket.leave(conversationId);
    });
    socket.on(
      "messages_delivered",

      async ({
        conversationId,

        currentUserId,
      }) => {
        console.log("marking delivered");

        await messageRepo.markDelivered(
          conversationId,

          currentUserId,
        );

        console.log("emitting delivered");

        io.to(conversationId).emit("messages_delivered", {
          conversationId,
        });
      },
    );
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
};
