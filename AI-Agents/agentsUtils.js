const { agentHandler } = require("./agentHandler");

const determineWhichAgentToAnswer = (agents, exp) => {
  const maxRand = 100;
  const TimeOut = 3000;
  for (const agent of agents) {
    const randNum = Math.round(Math.random() * maxRand);
    console.log("Random number: " + randNum);
    console.log("agent.agent_name: " + agent.agent_name);

    if (randNum <= agent.activity_level) {
      console.log(
        "Agent " +
          agent.agent_name +
          " is answering in: " +
          TimeOut / 1000 +
          " seconds"
      );
      setTimeout(() => {
        agentHandler(agent, exp);
      }, TimeOut);
      TimeOut += 2000;
      if (!exp.simultaneous_responses) {
        break;
      }
    }
  }
};

module.exports = { determineWhichAgentToAnswer };
