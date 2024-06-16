import { app, log } from "./src/utils/index.js";

// boot up requisitess
import "dotenv/config" // loading env variables
import "./src/dal/package/index.js"; // connecting database
import "./src/controllers/routes/index.js"; // initializes routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    const functionName = "app-listen";
    log.info(functionName, "Server started", PORT);
})