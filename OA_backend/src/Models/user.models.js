import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true,
    },
    passHash: {
      type: String,
      required: true,
      select:false,
    },
    testTaken: {
      type: [
        {
          testId: {
            type: mongoose.Types.ObjectId,
            ref: "Test",
            index: true,
            required: true,
          },
          resultId: {
            type: mongoose.Types.ObjectId,
            ref: "TestResult",
            index: true,
            required: true,
          },
        },
      ],
    },
    refreshToken: {
      type: String,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("passHash")) {
    return; //this will return if passHash is not modified
  }

  const salt = await bcrypt.genSalt(10);
  this.passHash = await bcrypt.hash(this.passHash, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
