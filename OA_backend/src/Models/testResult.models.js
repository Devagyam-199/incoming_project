import mongoose from "mongoose";

const questionResults = new mongoose.Schema(
  {
    questionIndex: {
      type: Number,
      required: true,
    },
    submission: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    timeSpent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const topicWisePerformance = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    correct: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    efficiency: {
      type: Number,
      required: true,
    },
    avgDifficulty: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const testResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    testId: {
      type: mongoose.Types.ObjectId,
      ref: "Test",
      required: true,
      index: true,
    },
    score: {
      type: Number,
      required: true,
      index: true,
    },
    avgEfficiency: {
      type: Number,
      required: true,
      index: true,
    },
    totalTimeTaken: {
      type: Number,
      required: true,
    },
    topicPerformance: {
      type: [topicWisePerformance],
      default: [],
    },

    questionResults: {
      type: [questionResults],
      default: [],
    },
  },
  { timestamps: true }
);

const TestResult = mongoose.model("TestResult", testResultSchema);

export default TestResult;
