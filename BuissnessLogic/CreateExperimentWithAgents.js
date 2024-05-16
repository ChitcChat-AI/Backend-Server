const {addExperimentsToStudy} = require('../DB/StudyQueries/studyQueries')
const {createExperiment} = require('../DB/Queries')
const {joinAgentToExperiment, createAgent, getExperimentWithAgentsAsJson} = require( '../DB/AgentsQueries/agentsQueries')
const CreateExperimentWithAgents = async (experiment, agents) => {
    const { study_id,
            exp_name,
            exp_subject,
            exp_num_participants,
            exp_provoking_prompt,
            exp_status } = experiment;
    const newExperiment = await createExperiment(exp_name, exp_subject, exp_provoking_prompt, exp_status, exp_num_participants)
    const {exp_id} = newExperiment;
    await Promise.all( agents.map( async (agent) => {
            const { agent_name,
                    sentiment,
                    opinion_alignment,
                    talking_style,
                    activity_level,
                    topics_of_interest,
                    messages_to_reply } = agent;
            const {agent_id} = await createAgent( agent_name, sentiment, opinion_alignment, talking_style, activity_level, topics_of_interest, messages_to_reply);
            await joinAgentToExperiment(exp_id,agent_id);
        }));
    await addExperimentsToStudy(study_id,exp_id);
    return await getExperimentWithAgentsAsJson(exp_id);

}

module.exports = {CreateExperimentWithAgents};