import express from "express";
import router from "./router";
import { protect } from "./modules/auth";
import morgan from "morgan";

const app = express();

// GLOBAL MIDDLEWARES
// middleware 'morgan' to log requests
app.use(morgan("dev"));
// middleware that lets the client send us JSON
app.use(express.json());
// middleware that lets client to encode and decode URL
app.use(express.urlencoded({ extended: true }));
// custom middleware
app.use((req, res, next) => {
  req.body.secret = "hello";
  next();
});

app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello adarsh" });
});

app.use("/api", protect, router);

export default app;
