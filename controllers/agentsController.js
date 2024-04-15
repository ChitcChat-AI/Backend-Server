const queries = require('../DB/Queries');

const getAIAgentsByExperimentId =async (req, res) =>{
    const exp_id = req.params.id;
    res.status(200).json(await queries.getAIAgentsByExperimentId(exp_id));
}

const createAIAgent = async (req, res) =>{
    const {agent_name, agent_sentiment, agent_eng, exp_id} = req.body;
    res.status(200).json(await queries.createAIAgent(agent_name, agent_sentiment, agent_eng, exp_id));
}

const updateAIAgent = async (req, res) =>{
    const {agent_id, agent_name, agent_sentiment, agent_eng} = req.body;
    res.status(200).json(await queries.updateAIAgent(agent_id, agent_name, agent_sentiment, agent_eng, ));
}

const deleteAIAgent = async(req, res) => {
    const {agent_id} =req.body;
    await queries.deleteAIAgent(agent_id);
    res.status(200)
}

module.exports={
    getAIAgentsByExperimentId,
    createAIAgent,
    updateAIAgent,
    deleteAIAgent
}