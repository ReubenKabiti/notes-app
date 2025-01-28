import { NextFunction, Request, Response } from "express";
import { errors } from "../util/constants";
import jwt from "jsonwebtoken";
import { User } from "shared";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!JWT_SECRET_KEY) {
    res.status(500).json({ message: errors.internalServerError });
    return;
  }

  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const token = authorizationHeader.split(" ")[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET_KEY);
    if (verified) {
      const userId = (jwt.decode(token) as User).id;
      res.locals.userId = userId;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

export default auth;
