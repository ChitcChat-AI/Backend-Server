const queries = require('../DB/Queries');

const insertAnswerPre = async (req,res) =>{
    const {exp_id, user_id, opinion_pre} = req.body;
    res.status(200).json(await  queries.addSurveyAnswerPre(exp_id, user_id, opinion_pre));
}
const insertAnswerPost = async (req,res) =>{
    const {exp_id, user_id, opinion_post} = req.body;
    res.status(200).json(await  queries.addSurveyAnswerPost(exp_id, user_id,opinion_post));
}

const getSurveyStatsByExperimentId = (req, res) => {
    const exp_id = req.params.id;
    res.status(200).json(queries.getSurveyStatsById(exp_id));
}
module.exports = {
    insertAnswerPost,
    insertAnswerPre,
    getSurveyStatsByExperimentId
}