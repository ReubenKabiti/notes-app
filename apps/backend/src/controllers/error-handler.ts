import { Prisma } from "@prisma/client";
import { Response } from "express";

const handleError = (error: any, res: Response) => {
  let code: number = 400;
  let message: string = "";
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        message = "Email or username already taken!";
        code = 400;
        break;
      default:
        message = "An unkown error occured, please contact the developer";
        code = 500;
        break;
    }
  }

  res.status(code).json({ message });
};

export default handleError;
