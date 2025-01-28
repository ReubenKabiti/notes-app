import express from "express";
import registerUserUseCase from "../use-cases/users/register-use.use-case";
import { PrismaUserRepository } from "../repositories/user.repository";
import prismaClient from "../repositories/prisma-client";
import handleError from "./error-handler";
import loginUserUseCase from "../use-cases/users/login-user.use-case";
import getUserUseCase from "../use-cases/users/get-user.use-case";
import auth from "../middleware/auth";
import deleteUserUseCase from "../use-cases/users/delete-user.use-case";

const usersController = express.Router();
const repository = new PrismaUserRepository(prismaClient);

usersController.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerUserUseCase({
      repository,
      registerUser: { username, email, password },
    });

    res.status(201).json(user);
  } catch (error) {
    handleError(error, res);
  }
});

usersController.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const token = await loginUserUseCase({
      repository,
      loginUser: { username, email, password },
    });
    res.status(200).json(token);
  } catch (error) {
    handleError(error, res);
  }
});

usersController.get("/", async (req, res) => {
  try {
    const id = req.query.id as string;
    const username = req.query.username as string;
    const email = req.query.email as string;
    const user = await getUserUseCase({
      repository,
      getUser: { id, username, email },
    });
    res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
});

usersController.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUserUseCase({ repository, id });
    res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
});

export default usersController;
