const determineWhichAgentToAnswer = (agents, numOfParticipants = 20) => {
  let startIndex = 0;
  const participantActivityLevel = 3;
  const agentsActive = [];

  for (const agent of agents) {
    let agentProbability = agent.activity_level;

    console.log("from: ", startIndex, " to: ", startIndex + agentProbability);
    agentsActive.push([startIndex, startIndex + agentProbability]);
    startIndex += agentProbability + 1;
  }

  const maxRand = participantActivityLevel * numOfParticipants + startIndex;
  const randNum = Math.round(Math.random() * maxRand);
  console.log("maxRand: ", maxRand);
  console.log("randNum: ", randNum);
  for (let i = 0; i < agentsActive.length; i++) {
    if (agentsActive[i][1] >= randNum && agentsActive[i][0] <= randNum) {
      return agents[i];
    }
  }

  return null;
};

module.exports = { determineWhichAgentToAnswer };
