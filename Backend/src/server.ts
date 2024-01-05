import express from "express";
import morgan from "morgan";
import { checkSchema } from "express-validator";
import { protect } from "./modules/aut";
import { createNewUser, getUser, getUserEmail, signin, updateUser2 } from "./handlers/user";
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
  socket.on("join_not", (data) => {
    socket.join("notification"); // Join the user to a socket room
    console.log(
      `proposed_user_id:${data.notification.proposed_user_id} , user_id: ${data.user},user_name: ${data.user_name}`
    );
  });
  socket.on("join_camp", (data) => {
    socket.join("camp"); // Join the user to a socket room
    console.log(
      `Proposal Created:campaign_id:${data.notification} , user_id: ${data.user},user_name: ${data.user_name}`
    );
  });
  socket.on("send_camp", (data) => {
    //{ user: user, message: message, room: 'room1' }
    io.to("camp").emit("receive_not", data);
    console.log(
      `proposal emitted : user:${socket.id} campaign_id: ${data.campaign_id}, message: ${data.proposed_user_id},status : ${data.status} , campaign_header: ${data.user_name} `,
    );
  });
  socket.on("send_notification", (data) => {
    //{ user: user, message: message, room: 'room1' }
    io.to("notification").emit("receive_notification", data);
    console.log(
      `user:${socket.id} user_name: ${data.user}, message: ${data.proposed_user_id},status : ${data.status} , campaign_header: ${data.campaign_header} `,
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
app.put('/updateUser2/:id', updateUser2);
app.get('/getUserEmail/:id', getUserEmail);
export default app;
