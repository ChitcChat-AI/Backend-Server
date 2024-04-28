const determineWhichAgentToAnswer = (agents) => {
    let startIndex = 0;
    const agentsActive = [];
    for(const agent of agents) {
        agentsActive.push([startIndex, startIndex + agent.activity_level]);
        startIndex += agent.activity_level + 1;
    }
    const randNum = Math.round(Math.random() * (startIndex - 1) * 2);
    console.log("the chosen number " + randNum + "agentsList " + agentsActive);
    for(let i = 0; i < agentsActive.length; i++) {
        if(agentsActive[i][1] >= randNum && agentsActive[i][0] <= randNum) {
            return agents[i];
        }
    }
    
    return null;
}

module.exports = { determineWhichAgentToAnswer };
