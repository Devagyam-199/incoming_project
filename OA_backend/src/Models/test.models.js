import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
    options: {
      type: [String],
      required: true,
    },
    correctOption: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      index: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    numberOfQuestions: {
      type: Number,
      required: true,
    },
    topics: {
      type: [String],
      required: true,
    },
    avgDifficulty: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
      required: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);

export default Test;
