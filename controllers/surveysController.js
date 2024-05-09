const queries = require('../DB/Queries');
const {wsSurvey} = require('../WebSocket/WebSocket')
const {APIError} = require("../ErrorHaneling/APIError");
const insertAnswerPre = async (req, res, next) => {
    try {
        const {exp_id, user_id, opinion_pre} = req.body;
        res.status(200).json(await queries.addSurveyAnswerPre(exp_id, user_id, opinion_pre));
        wsSurvey.emit('update_survey_vote', await queries.getSurveyStatsById(exp_id))
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}
const insertAnswerPost = async (req, res, next) => {
    try {
        const {exp_id, user_id, opinion_post} = req.body;
        res.status(200).json(await queries.addSurveyAnswerPost(exp_id, user_id, opinion_post));
        wsSurvey.emit('update_survey_vote', await queries.getSurveyStatsById(exp_id))
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}

const getSurveyStatsByExperimentId = async (req, res, next) => {
    try {
        const exp_id = req.params.id;
        res.status(200).json(await queries.getSurveyStatsById(exp_id));
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}
module.exports = {
    insertAnswerPost,
    insertAnswerPre,
    getSurveyStatsByExperimentId
}