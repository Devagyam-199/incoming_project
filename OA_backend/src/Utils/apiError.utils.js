class APIError extends Error {
    constructor(
        responseCode,
        message = "An error has occurred",
        errorDetails = [],
        stackTrace = ""
    ){
        super(message);
        this.responseCode = responseCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errorDetails = errorDetails;
        if(stackTrace){
            this.stack = stackTrace;
        }
    }
}

export default APIError;