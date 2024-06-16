import { mongoose, log } from "../../utils/index.js";

let connection;

(async () => {
  const functionName = "package";
  try {
    connection = await mongoose.connect(process.env.MONGO_URL);
    log.info(functionName, "mongodb", "mongodb connected!");
  } catch (error) {
    log.error(functionName, "mongodb", error);
    throw new Error(error);
  }
})();

export default connection;
