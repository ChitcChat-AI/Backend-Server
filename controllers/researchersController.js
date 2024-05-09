const queries = require('../DB/Queries');
const {APIError} = require("../ErrorHaneling/APIError");


const createResearcher = async (req, res, next) => {
    try {
        const {researcher_id, researcher_name, researcher_email, researcher_photo_url} = req.body;
        res.status(200).json(await queries.createResearcher(researcher_id, researcher_name, researcher_email, researcher_photo_url));
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}

const getResearcherById = async (req, res, next) => {
    try {
        const researcher_id = req.params.id;
        res.status(200).json(await queries.getResearcherById(researcher_id));
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}

module.exports = {
    createResearcher,
    getResearcherById
}