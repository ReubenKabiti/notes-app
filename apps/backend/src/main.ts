import express from "express";
import dotenv from "dotenv";
import usersController from "./controllers/users.controller";
import notesController from "./controllers/notes.controller";

dotenv.config();

const PORT = process.env.PORT ?? "8080";

const app = express();

app.use(express.json());

app.listen(PORT, () => console.log(`waiting for connection on port: ${PORT}`));
app.use("/users", usersController);
app.use("/notes", notesController);
