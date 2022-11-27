import { comparePassword, createJWT } from "./../modules/auth";
import prisma from "../db";
import { hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        passwrod: await hashPassword(req.body.password),
      },
    });
    const token = createJWT(user);
    res.json({
      access_token: token,
    });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(300).json({
      message: "field is require",
    });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  const isValid = await comparePassword(password, user.passwrod);
  if (!isValid) {
    res.status(400).json({
      message: "In valid Username and Password",
    });
    return;
  }
  const token = createJWT(user);
  res.json({
    access_token: token,
  });
};
