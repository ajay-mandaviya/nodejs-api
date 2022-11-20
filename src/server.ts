import express from "express";
import router from "./router";
import morgan from "morgan";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  //add some thing with request and pass
  // req.somthing = something
  next();
});
app.get("/", (req, res) => {
  res.json({
    msg: "route get",
  });
});

app.use("/api", router);

export default app;
