const queries = require('../DB/Queries');
const {APIError} = require("../ErrorHaneling/APIError");

const getAIAgentsByExperimentId = async (req, res, next) => {
    try {
        const exp_id = req.params.id;
        res.status(200).json(await queries.getAIAgentsByExperimentId(exp_id));
    } catch (err) {
        const apiError = new APIError(err.name, err.message)
        next(apiError, req, res);
    }
}

const createAIAgent = async (req, res, next) => {
    try {
        const {agent_name, agent_sentiment, agent_eng, exp_id} = req.body;
        res.status(200).json(await queries.createAIAgent(agent_name, agent_sentiment, agent_eng, exp_id));
    } catch (err) {
        const apiError = new APIError(err.name, err.message)
        next(apiError, req, res);
    }
}

const updateAIAgent = async (req, res, next) => {
    try {
        const {agent_id, agent_name, agent_sentiment, agent_eng} = req.body;
        res.status(200).json(await queries.updateAIAgent(agent_id, agent_name, agent_sentiment, agent_eng,));
    } catch (err) {
        const apiError = new APIError(err.name, err.message)
        next(apiError, req, res);
    }
}

const deleteAIAgent = async (req, res, next) => {
    try {
        const {agent_id} = req.body;
        await queries.deleteAIAgent(agent_id);
        res.status(200)
    } catch (err) {
        const apiError = new APIError(err.name, err.message)
        next(apiError, req, res);
    }
}

module.exports = {
    getAIAgentsByExperimentId,
    createAIAgent,
    updateAIAgent,
    deleteAIAgent
}