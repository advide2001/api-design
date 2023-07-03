import jwt from "jsonwebtoken";

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  // check if the incoming request has a bearer token
  if (!bearer) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }

  // check if the bearer token is valid
  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "Invalid Token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(401);
    res.json({ message: "Not a valid token" });
    return;
  }
};
