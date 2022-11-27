import app from "./server";
import dotenv from "dotenv";
import config from "./config";

dotenv.config();

app.listen(config.port, () => {
  console.log("server running on http://localhost:3000", config.port);
});
// stage = production
