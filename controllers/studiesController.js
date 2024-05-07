const queries = require('../DB/StudyQueries/studyQueries');
const {APIError} = require('../ErrorHaneling/APIError')

const getAllStudies = async (req, res, next) => {
    try {
        res.status(200).json(await queries.getAllStudies());
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}
const getStudyById = async (req, res, next) => {
    try {
        const studyId = req.params.id;
        res.status(200).json(await queries.getStudyById(studyId));
    } catch (err) {
        const apiError = new APIError(err.name, err.message)
        next(apiError, req, res);
    }
}


const createStudy = async (req, res, next) => {
    try {
        const {study_name, study_subject, study_prompt, study_description} = req.body;
        res.status(200).json(await queries.createStudy(study_name,study_subject,study_prompt,study_description));
    } catch (err) {
        const apiError = new APIError(err.name, err.message)
        next(apiError, req, res);
    }
}


const updateStudy = async (req, res, next) => {
    try {
        const {study_id, study_name, study_subject, study_prompt, study_description} = req.body;
        const row = await queries.updateStudy(study_id, study_name, study_subject, study_prompt, study_description)
        res.status(200).json(row);
    } catch (err) {
        const apiError = new APIError(err.name, err.message)
        next(apiError, req, res);
    }
}



const deleteStudy = async (req, res, next) => {
    try {
        const {study_id} = req.body;
        await queries.deleteStudy(study_id);
        res.status(200)
    } catch (err) {
        const apiError = new APIError(err.name, err.message)
        next(apiError, req, res);
    }
}

const getExperimentsByStudyId = async (req, res, next) => {
    try {
        const studyId = req.params.id;
        res.status(200).json(await queries.getExperimentsByStudyId(studyId));
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}


module.exports = {
    getAllStudies,
    getStudyById,
    createStudy,
    updateStudy,
    deleteStudy,
    getExperimentsByStudyId

}
