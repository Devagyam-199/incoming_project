import express from "express"
import cors from "cors"
import globalErrorHandler from "./Utils/errorHandler.utils.js";

const app = express();

const corsOptions = {
    origin : "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
    credentials:true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(globalErrorHandler);

export default app;
