import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = new Map();

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  let currentRoom = null;
  let currentUser = null;

  //fetching room id and user name 
  socket.on("join", ({ roomId, userName }) => {
    if (currentRoom) { // if user is present in some room then we wll eliminate the user from that room
      socket.leave(currentRoom);
      rooms.get(currentRoom).delete(currentUser);// fetch the current room from rooms map() and delete the current user
      io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));
    }

    currentRoom = roomId;
    currentUser = userName;

    socket.join(roomId); // add the user to room 

    if (!rooms.has(roomId)) { // if this room is not created we will create it
      rooms.set(roomId, new Set());
    }

    rooms.get(roomId).add(userName); // adding the user to. this room

    io.to(roomId).emit("userJoined", Array.from(rooms.get(currentRoom)));
  });

  socket.on("codeChange", ({ roomId, code }) => {
    socket.to(roomId).emit("codeUpdate", code);
  });

  socket.on("leaveRoom", () => {
    if (currentRoom && currentUser) {
      rooms.get(currentRoom).delete(currentUser);
      io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));

      socket.leave(currentRoom);

      currentRoom = null;
      currentUser = null;
    }
  });

  socket.on("typing", ({ roomId, userName }) => {
    socket.to(roomId).emit("userTyping", userName);
  });

  socket.on("languageChange", ({ roomId, language }) => {
    io.to(roomId).emit("languageUpdate", language);
  });

  socket.on("disconnect", () => {
    if (currentRoom && currentUser) {
      rooms.get(currentRoom).delete(currentUser);
      io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));
    }
    console.log("user Disconnected");
  });
});

const port = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));
// in vite built folder isd of name dist

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
  console.log("server is working on port 5001");
});