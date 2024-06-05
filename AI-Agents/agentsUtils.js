const determineWhichAgentToAnswer = (agents, exp) => {
  const maxRand = 100;

  for (const agent of agents) {
    const randNum = Math.round(Math.random() * maxRand);

    console.log("randNum: ", randNum);
    console.log("agent.activity_level: ", agent.activity_level);

    if (randNum <= agent.activity_level) {
      console.log("responded", agent.name);
      console.log("exp.respondParallel", exp.respondParallel);

      agentHandler(agent, exp);
      if (!exp.simultaneous_responses) {
        break;
      }
    }
  }
};

module.exports = { determineWhichAgentToAnswer };
