const {HttpStatusCode} = require('../constants');
const { logger} = require('./ErrorLogger');
class BaseError extends Error {
    name;
    httpCode;

    constructor(name, httpCode, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;

        Error.captureStackTrace(this);
    }
}

//free to extend the BaseError
class APIError extends BaseError {
    constructor(name, description = 'internal server error' , httpCode = HttpStatusCode.INTERNAL_SERVER) {
        super(name, httpCode, description);
    }
}


   const  handleError =  async(err)=>{
        await logger.error(
            err.message
        );
    }


module.exports = {handleError,APIError}