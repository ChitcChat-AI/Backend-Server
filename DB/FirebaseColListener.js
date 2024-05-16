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
    console.log("docData: ", docData);
    if (
      !docData?.hasOwnProperty("sentimentScore") &&
      docData?.createdAt !== null
    ) {
      const { exp, agents } = await getExperimentWithAgentsAsJson(colId);
      let isAgent = false;
      console.log("exp: ", exp);

      for (const agent of agents) {
        if (docData?.name === agent.agent_name) {
          isAgent = true;
        }
      }
      if (!isAgent) {
        console.log("isAgent: ", !isAgent);

        const selectedAgent = determineWhichAgentToAnswer(
          agents,
          exp.exp_num_participants
        );
        if (selectedAgent) {
          await agentHandler(selectedAgent, exp);
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
