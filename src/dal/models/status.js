import { mongoose } from "../../utils/index.js";

const statusSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    contentType: {
      type: String,
    },
    content: {
      type: String,
    },
    contentURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Follow = mongoose.model("status", statusSchema);

export default Follow;
