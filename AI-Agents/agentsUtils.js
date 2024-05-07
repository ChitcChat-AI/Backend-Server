const determineWhichAgentToAnswer = (agents, numOfParticipants = 20) => {
  let startIndex = 0;
  const valueOfActivityLevel = 5;
  const agentsActive = [];
  for (const agent of agents) {
    let agentProbability = agent.activity_level * valueOfActivityLevel;
    agentsActive.push([startIndex, startIndex + agentProbability]);
    startIndex += agentProbability + 1;
  }
  const averageNumber = startIndex / agents.length;
  const randNum = Math.round(
    Math.random() * (averageNumber * numOfParticipants)
  );

  for (let i = 0; i < agentsActive.length; i++) {
    if (agentsActive[i][1] >= randNum && agentsActive[i][0] <= randNum) {
      return agents[i];
    }
  }

  return null;
};

module.exports = { determineWhichAgentToAnswer };
