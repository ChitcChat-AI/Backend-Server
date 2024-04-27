const {createExperiment} = require('../DB/Queries')
const {jointAgentToExperiment, createAgent, getExperimentWithAgentsAsJson} = require( '../DB/AgentsQueries/agentsQueries')
const CreateExperimentWithAgents = async (experiment, agents) => {
    const { exp_name,
            exp_subject,
            exp_provoking_prompt,
            exp_status } = experiment;

    const expId = await createExperiment(exp_name, exp_subject, exp_provoking_prompt, exp_status)
        .then((newExperiment) => {
        const {exp_id} = newExperiment;
        agents.forEach(async (agent) => {
            const { agent_name,
                    sentiment,
                    opinion_alignment,
                    talking_style,
                    activity_level,
                    topics_of_interest,
                    messages_to_reply } = agent;
            const {agent_id} = await createAgent( agent_name, sentiment, opinion_alignment, talking_style, activity_level, topics_of_interest, messages_to_reply);
            await jointAgentToExperiment(exp_id,agent_id);
            return exp_id;
        } )

    })
    return await getExperimentWithAgentsAsJson(expId);

}

module.exports = {CreateExperimentWithAgents};