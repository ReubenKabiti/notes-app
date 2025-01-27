import express from "express";
import registerUserUseCase from "../use-cases/users/register-use.use-case";
import { PrismaUserRepository } from "../repositories/user.repository";
import prismaClient from "../repositories/prisma-client";
import handleError from "./error-handler";
import loginUserUseCase from "../use-cases/users/login-user.use-case";

const usersController = express.Router();

usersController.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const repository = new PrismaUserRepository(prismaClient);
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
    const repository = new PrismaUserRepository(prismaClient);
    const token = await loginUserUseCase({
      repository,
      loginUser: { username, email, password },
    });
    res.status(200).json(token);
  } catch (error) {
    handleError(error, res);
  }
});

export default usersController;
