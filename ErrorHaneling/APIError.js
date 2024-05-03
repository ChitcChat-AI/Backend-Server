const {HttpStatusCode} = require('../constants');
const { logger} = require('./ErrorLogger');
class BaseError extends Error {
    httpCode;

    constructor(error, httpCode) {
        super(error);
        Object.setPrototypeOf(this, new.target.prototype);
        this.httpCode = httpCode;

        Error.captureStackTrace(this);
    }
    handleError =  async()=>{
        await logger.error(
            this.stack
        );
    }
}

//free to extend the BaseError
class APIError extends BaseError {
    constructor(error , httpCode = HttpStatusCode.INTERNAL_SERVER) {
        super(error, httpCode);
    }
}





module.exports = {APIError}