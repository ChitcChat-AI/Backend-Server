const queries = require('../DB/AgentsQueries/agentsQueries');
const {APIError} = require("../ErrorHaneling/APIError");
const { humanizeResponse } = require("../AI-Agents/humanizeResponse");
const { generateResponse } = require("../AI-Agents/gptGenerator");

const getAgentsByExperimentId = async (req, res, next) => {
    try {
        const exp_id = req.params.id;
        res.status(200).json(await queries.getAgentsByExperimentId(exp_id));
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}

const getAgentById = async (req, res, next) => {
    try {
        const agentId = req.params.id;
        res.status(200).json(await queries.getAgentById(agentId));
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}

const createAgent = async (req, res, next) => {
    try {
        const {
            agent_name,
            opinion_alignment,
            talking_style,
            activity_level,
            messages_to_reply,
            sentiment} = req.body;
        res.status(200).json(await queries.createAgent(agent_name,sentiment,opinion_alignment,talking_style,activity_level,messages_to_reply));
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}

const updateAgent = async (req, res, next) => {
    try {
        const {agent_id} = req.body;
        if (!agent_id) throw new Error('agent_id required in request body for update');
        delete req.body.agent_id;
        res.status(200).json(await queries.updateAgent(agent_id,Object.entries(req.body)));
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}

const deleteAgent = async (req, res, next) => {
    try {
        const {agent_id} = req.body;
        await queries.deleteAgent(agent_id);
        res.status(200)
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}
const testAgentResponse = async (req, res) => {
    const gptPrompt = [req.body.system_prompt, ...req.body.user_prompt];
    const agentResponse = await generateResponse(gptPrompt);
    res.status(200).json(humanizeResponse(agentResponse));
}

module.exports = {
    getAgentsByExperimentId,
    createAgent,
    updateAgent,
    deleteAgent,
    getAgentById,
    testAgentResponse
}
