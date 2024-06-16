import { mongoose } from "../../utils/index.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: function () {
        return !this.mobileNumber;
      },
      unique: true,
    },
    mobileNumber: {
      type: String,
      unique: true,
      required: function () {
        return !this.email;
      },
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
    website: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("users", userSchema);

export default User;
