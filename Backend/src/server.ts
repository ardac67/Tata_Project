import express from "express";
import morgan from "morgan";
import { checkSchema } from "express-validator";
import { protect } from "./modules/aut";
import { createNewUser, signin } from "./handlers/user";
import { handleInputError } from "./modules/middleware";
import { validatorForUser, validatorSign } from "./modules/validationSchemas";
import cors from "cors";
import router from "./router";
import multer from "multer";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data.room); // Join the user to a socket room
    console.log(
      `user:${socket.id} user_id: ${data.user},user_name: ${data.user_name}, user_room: ${data.room}`
    );
  });
  socket.on("send_message", (data) => {
    //{ user: user, message: message, room: 'room1' }
    io.to(data.room).emit("receive_message", data);
    console.log(
      `user:${socket.id} user_name: ${data.user}, message: ${data.message}`,
      data.room
    );
  });
});

server.listen(3002, () => {
  console.log("Welcome to Tata-MESSAGE");
});

const corsOptions = {
  origin: ["http://localhost:3000", "null"], // Add 'null' as an allowed origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable cookies and HTTP authentication if needed
  optionsSuccessStatus: 204, // HTTP status code to respond with for preflight requests
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "'Welcome to Tata-API'" });
});

//app.post('/createUser',checkSchema(validatorForUser),handleInputError,createNewUser)
app.post("/createUser", createNewUser);
app.post("/signin", checkSchema(validatorSign), handleInputError, signin);
app.use("/api", protect, router);

export default app;
