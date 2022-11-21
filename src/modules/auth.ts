import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * for signIn
 * @param password
 * @param hash
 * @returns
 */
export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

/**
 *
 * @param password
 * @returns
 */

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

/**
 *
 * @param user
 * @returns
 */

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

/**
 * middleware
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).json({
      message: "Unauthenticated",
    });
    return;
  }
  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).json({
      message: "Unauthenticated",
    });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verify user is", user);
    req.user = user;
    next();
  } catch (error) {
    console.log("error while verify", error);
    res.json({
      message: "Unauthorized",
    });
  }
};
