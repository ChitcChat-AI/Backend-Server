const db = require("./DB");


const createExperiment  = async (subject, prompt, status ) =>
{
    const {rows} =  await db.query(
        "INSERT INTO experiments (exp_subject, exp_provoking_prompt, exp_status) VALUES ($1, $2, $3) RETURNING *",
        [subject, prompt, status]
    );
    return rows[0];
}
const createAIAgent = async (name,sentiment, engLevel, experimentId) =>{
    const {rows} =  await db.query(
        "INSERT INTO ai_agents (agent_name, sentiment, level_of_engagement, exp_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [name,sentiment, engLevel, experimentId]
    );
    return rows[0];
}

const getAllExperiments = async () => {
    const {rows} =  await db.query('SELECT * FROM experiments');
    return rows;
}
const getAllAIAgents = async () => {
    const {rows} =  await db.query('SELECT * FROM ai_agents');
    return rows;
}

const getExperimentById = async (id) =>{
    const {rows} = await db.query('SELECT * FROM experiments WHERE exp_id = $1', [id]);
    return rows;
}
const getAIAgentById = async (id) =>{
    const {rows} = await db.query('SELECT * FROM ai_agents WHERE agent_id = $1', [id]);
    return rows;

}

const getAIAgentsByExperimentId = async(id) =>{
    const {rows} = await db.query('SELECT * FROM ai_agents WHERE exp_id = $1', [id]);
    return rows;

}

const updateExperiment = async (id, subject, prompt, status) =>{
   const  {rows} = await db.query(
        "UPDATE experiments SET exp_subject = $1, exp_provoking_prompt= $2, exp_status = $3 " +
            "WHERE exp_id = $4 RETURNING *",
        [subject, prompt, status, id]
    );
   return rows;
}
const updateAIAgent = async (id, name, sentiment, levelEng) =>{
    const  {rows} = await db.query(
        "UPDATE ai_agents SET agent_name = $1, sentiment= $2, level_of_engagement = $3 " +
        "WHERE agent_id = $4 RETURNING *",
        [name, sentiment, levelEng, id]
    );
    return rows;
}

const deleteExperiment = async (id) =>{
    await db.query('DELETE FROM experiments WHERE exp_id = $1', [id]);
}

const deleteAIAgent = async (id) =>{
    await db.query('DELETE FROM ai_agents WHERE agent_id = $1', [id]);
}

module.exports = {
    createExperiment,
    createAIAgent,
    getAllExperiments,
    getAllAIAgents,
    getExperimentById,
    getAIAgentById,
    updateExperiment,
    updateAIAgent,
    deleteExperiment,
    deleteAIAgent,
    getAIAgentsByExperimentId
}


