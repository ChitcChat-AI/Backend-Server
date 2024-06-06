const { agentHandler } = require("./agentHandler");

const determineWhichAgentToAnswer = (agents, exp) => {
  const maxRand = 100;
  const TimeOut = 3000;
  for (const agent of agents) {
    const randNum = Math.round(Math.random() * maxRand);

    if (randNum <= agent.activity_level) {
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
