const {db} = require('./firebase');
const { onSnapshot, collection, limit , query, orderBy} = require( "firebase/firestore");
const { getExperimentWithAgentsAsJson } = require("./AgentsQueries/agentsQueries");
const { agentHandler } = require("../AI-Agents/agentHandler");
const { determineWhichAgentToAnswer } = require("../AI-Agents/agentsUtils");
 const firestoreColListener = (colId) => {
    const q = query(collection(db, colId), orderBy('createdAt', 'desc'), limit(1));
     return onSnapshot(q, async (querySnapShot) => {
         let agentName;
         querySnapShot.forEach((doc) => {
             agentName = doc.data().name;
         });
         console.log("listen to " + agentName);
         const {exp, agents} = await getExperimentWithAgentsAsJson(colId);
         let isAgent = false;
         for (const agent of agents) {
            if(agentName === agent.agent_name){
                isAgent =true;
                console.log("skipped");
            }
         }
         if(!isAgent) {
            const selectedAgent = determineWhichAgentToAnswer(agents);
            if(selectedAgent) {
                await agentHandler(selectedAgent, exp);
                console.log("Agent is " +selectedAgent.agent_name);
            }
         }

     });
}

module.exports = {firestoreColListener}
