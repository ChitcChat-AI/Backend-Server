const queries = require('../DB/Queries');

const getExperimentById = async (req, res) => {
    const exp_id = req.params.id;
    res.status(200).json(await queries.getExperimentById(exp_id));
}


const createExperiment = async (req, res) => {
    const {exp_subject, exp_prompt, exp_status} = req.body;
    res.status(200).json(await queries.createExperiment(exp_subject, exp_prompt, exp_status));
}


const updateExperiment = async (req, res) => {
    const {exp_id, exp_subject, exp_prompt, exp_status} = req.body;
    res.status(200).json(await queries.updateExperiment(exp_id, exp_subject, exp_prompt, exp_status));
}


const deleteExperiment = async (req, res) => {
    const {exp_id} = req.body;
    await queries.deleteExperiment(exp_id);
    res.status(200)
}

module.exports ={
    getExperimentById,
    createExperiment,
    updateExperiment,
    deleteExperiment
}
