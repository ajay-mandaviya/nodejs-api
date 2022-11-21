import app from "./server";
import dotenv from "dotenv";
dotenv.config();

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
