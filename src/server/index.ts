import path from "path";
import express from "express";
import { router } from "./routes";
import { wsServer } from "./sockets";

const port = 8080;

const app = express();
app.use(express.static(path.resolve(__dirname, "..", "client")));
app.use("/api", router);

const server = app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);

// Attach the socket server to the same HTTP server
server.on("upgrade", (request, socket, head) => {
  if (request.url === "/ws") {
    wsServer.handleUpgrade(request, socket, head, (ws) =>
      wsServer.emit("connection", ws, request)
    );
  }
});
