const queries = require('../DB/Queries');
const agentQueries = require('../DB/AgentsQueries/agentsQueries')
const {CreateExperimentWithAgents} = require('../BuissnessLogic/CreateExperimentWithAgents');
const {ChangeExperimentStatus} = require('../BuissnessLogic/ChangeExperimentStatus')
const {APIError} = require('../ErrorHaneling/APIError')
const getExperimentWithAgentsById = async (req, res, next) => {
    try {
        const exp_id = req.params.id;
        res.status(200).json(await agentQueries.getExperimentWithAgentsAsJson(exp_id));
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}


const createExperiment = async (req, res, next) => {
    try {
        const {exp_name, exp_subject, exp_provoking_prompt, exp_status} = req.body;
        res.status(200).json(await queries.createExperiment(exp_name, exp_subject, exp_provoking_prompt, exp_status));
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}


const updateExperiment = async (req, res, next) => {
    try {
        const {exp_id} = req.body;
        if (!exp_id) throw new Error('exp_id required in request body for update');
        delete req.body.exp_id;
        const row = await queries.updateExperimentDynamically(Object.entries(req.body), exp_id);
        res.status(200).json(row);
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}

const createExperimentWithAgents = async (req, res, next) => {
    try {
        const {exp, agents} = req.body;
        const newExperimentWithAgents = await CreateExperimentWithAgents(exp, agents);
        res.status(200).json(newExperimentWithAgents);
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}


const deleteExperiment = async (req, res, next) => {
    try {
        const {exp_id} = req.body;
        await queries.deleteExperiment(exp_id);
        res.status(200)
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}

const getAllExperiments = async (req, res, next) => {
    try {
        res.status(200).json(await queries.getAllExperimentsWithStudyIdAndName());
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}
const updateExperimentStatus = async (req, res, next) => {
    try {
        const {exp_id, exp_status} = req.body;
        const row = await ChangeExperimentStatus(exp_id, exp_status);
        res.status(200).json(row);
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
}

module.exports = {
    getExperimentWithAgentsById,
    createExperiment,
    updateExperiment,
    deleteExperiment,
    getAllExperiments,
    createExperimentWithAgents,
    updateExperimentStatus
}
