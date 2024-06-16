import { mongoose } from "../../utils/index.js";

const statusActionSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    statusID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "status",
      required: true,
    },
    comments: [
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        username: {
          type: mongoose.Schema.Types.String,
          ref: "users",
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    likes: [
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        username: {
          type: mongoose.Schema.Types.String,
          ref: "users",
          required: true,
        },
        like: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const StatusActions = mongoose.model("status_actions", statusActionSchema);

export default StatusActions;
