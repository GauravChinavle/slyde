import { mongoose } from "../../utils/index.js";

const followSchema = new mongoose.Schema(
  {
    followerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    followeeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

followSchema.index({ followerID: 1, followeeID: 1 }, { unique: true });

const Follow = mongoose.model("follow", followSchema);

export default Follow;
