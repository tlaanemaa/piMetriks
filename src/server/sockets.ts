import { WebSocketServer } from "ws";

export const wsServer = new WebSocketServer({ noServer: true });

wsServer.on("connection", (socket) => {
  console.log("CONNECTIOOOOOON");
  socket.on("close", () => console.log("IT LEFFFTTTT"));
});
