const queries = require('../DB/Queries');
const agentQueries  =require('../DB/AgentsQueries/agentsQueries')
const {CreateExperimentWithAgents} = require('../BuissnessLogic/CreateExperimentWithAgents');
const {wsExperiments} = require('../WebSocket');
const {ChangeExperimentStatus} = require('../BuissnessLogic/ChangeExperimentStatus')
const getExperimentWithAgentsById = async (req, res) => {
    const exp_id = req.params.id;
    res.status(200).json(await agentQueries.getExperimentWithAgentsAsJson(exp_id));
}


const createExperiment = async (req, res) => {
    const {exp_name, exp_subject, exp_provoking_prompt, exp_status} = req.body;
    res.status(200).json(await queries.createExperiment(exp_name, exp_subject, exp_provoking_prompt, exp_status));
}


const updateExperiment = async (req, res) => {
    const {exp_id, exp_name, exp_subject, exp_provoking_prompt, exp_status} = req.body;
    const row = await queries.updateExperiment(exp_id,exp_name, exp_subject, exp_provoking_prompt, exp_status)
    wsExperiments.emit('update_experiment', row);
    res.status(200).json(row);
}

const createExperimentWithAgents = async (req, res) => {
    const {exp, agents} = req.body;
    const newExperimentWithAgents = await CreateExperimentWithAgents(exp,agents);
    res.status(200).json(newExperimentWithAgents);
}


const deleteExperiment = async (req, res) => {
    const {exp_id} = req.body;
    await queries.deleteExperiment(exp_id);
    res.status(200)
}

const getAllExperiments = async (req, res) => {
    res.status(200).json(await queries.getAllExperiments());
}
const updateExperimentStatus = async (req, res) => {
    const {exp_id, exp_status} = req.body;
   const row =  await ChangeExperimentStatus(exp_id,exp_status);
   res.status(200).json(row);

}

module.exports ={
    getExperimentWithAgentsById,
    createExperiment,
    updateExperiment,
    deleteExperiment,
    getAllExperiments,
    createExperimentWithAgents,
    updateExperimentStatus
}
