const determineWhichAgentToAnswer = (agents, numOfParticipants = 20) => {
  let startIndex = 0;
  const participantActivityLevel = 2;
  const agentsActive = [];

  for (const agent of agents) {
    let agentProbability = agent.activity_level;
    agentsActive.push([startIndex, startIndex + agentProbability]);
    startIndex += agentProbability + 1;
  }

  const maxRand = participantActivityLevel * numOfParticipants + startIndex;
  const randNum = Math.round(Math.random() * maxRand);

  for (let i = 0; i < agentsActive.length; i++) {
    if (agentsActive[i][1] >= randNum && agentsActive[i][0] <= randNum) {
      return agents[i];
    }
  }

  return null;
};

module.exports = { determineWhichAgentToAnswer };
