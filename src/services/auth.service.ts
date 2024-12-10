import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/auth.util";
import { HttpError } from "../utils/httpErrors.utils";
import logger from "../utils/logger.util";
import { userService } from "./user.service";

const loginWithEmailAndPassword = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    logger.error(email);
    throw new HttpError("User not found", 400);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new HttpError("Password incorrect", 400);
  }

  const token = generateAccessToken(user.email, user.id);

  return token;
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const newUser = await userService.createUserWithEmailAndPassword(
    email,
    password
  );

  const token = generateAccessToken(newUser.email, newUser.id);

  return token;
};

export const authService = {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
};