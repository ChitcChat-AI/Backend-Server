const { publishAgentResponse } = require("./publishAgentResponse");
const { createUserPrompt } = require("./createUserPrompt");
const { generateAgentPrompt } = require("./AgentConfig");
const { generateResponse } = require("./gptGenerator");
const { humanizeResponse } = require("./humanizeResponse");

const agentHandler = async (agent, experiment) => {

    const systemPrompt =  generateAgentPrompt(agent, experiment.exp_subject);
    const userPrompt = await createUserPrompt(experiment.exp_id, agent.messages_to_reply, agent.agent_name);
    if (userPrompt?.length === 0) {
        return;
    }
    const gptPrompt = [systemPrompt, ...userPrompt];
    const agentResponse = await generateResponse(gptPrompt);
    const agentResponseAfterHumanized = humanizeResponse(agentResponse);
    await publishAgentResponse(experiment.exp_id, agentResponseAfterHumanized, agent.agent_name, agent.agent_id);

}

module.exports = { agentHandler };
