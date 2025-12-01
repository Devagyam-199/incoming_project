import APIError from "./apiError.utils.js";

const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof APIError) {
        return res.status(err.responseCode).json({
            success: false,
            message: err.message,
        });
    }

    console.error("Unhandled Error:", err);

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

export default globalErrorHandler
