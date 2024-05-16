const { db } = require("./firebase");
const {
  onSnapshot,
  collection,
  limit,
  query,
  orderBy,
  setDoc,
  doc,
} = require("firebase/firestore");
const {
  getExperimentWithAgentsAsJson,
} = require("./AgentsQueries/agentsQueries");
const { agentHandler } = require("../AI-Agents/agentHandler");
const { determineWhichAgentToAnswer } = require("../AI-Agents/agentsUtils");
const { set } = require("express/lib/application");
const { analyzeSentiment } = require("../Neo4j/getSentimentGCP");

function containsEnglishChars(str) {
  return /[a-zA-Z]/.test(str);
}

const firestoreColListener = (colId) => {
  const q = query(
    collection(db, colId),
    orderBy("createdAt", "desc"),
    limit(1)
  );
  return onSnapshot(q, async (querySnapShot) => {
    let docData;
    let docId;
    querySnapShot.forEach((doc) => {
      docData = doc.data();
      docId = doc.id;
    });
    if (
      !docData?.hasOwnProperty("sentimentScore") &&
      docData?.createdAt !== null
    ) {
      const { exp, agents } = await getExperimentWithAgentsAsJson(colId);
      console.log("exp is " + JSON.stringify(exp));
      let isAgent = false;
      for (const agent of agents) {
        if (docData?.name === agent.agent_name) {
          isAgent = true;
          console.log("skipped");
        }
      }
      console.log("isAgent is " + JSON.stringify(agents));
      if (!isAgent) {
        const selectedAgent = determineWhichAgentToAnswer(
          agents,
          exp.exp_num_participants
        );
        if (selectedAgent) {
          await agentHandler(selectedAgent, exp);
          console.log("Agent is " + selectedAgent.agent_name);
        }
      }

      const docRef = doc(db, colId, docId);
      let sentiment = { score: 0 };

      if (containsEnglishChars(docData.text)) {
        try {
          const sentimentTemp = await analyzeSentiment(docData.text);
          if (sentimentTemp) {
            sentiment.score = sentimentTemp.score;
          }
        } catch (e) {
          console.log("get sentiment error" + e);
        }
      }
      console.log(sentiment.score);
      await setDoc(docRef, {
        avatar: docData.avatar,
        createdAt: docData.createdAt,
        name: docData.name,
        text: docData.text,
        uid: docData.uid,
        sentimentScore: sentiment.score,
      });
    } else {
      console.log(docData);
    }
  });
};

module.exports = { firestoreColListener };
