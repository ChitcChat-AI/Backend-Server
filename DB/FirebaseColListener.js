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

    console.log("DocData:", docData);

    if (
      !docData?.hasOwnProperty("sentimentScore") &&
      docData?.createdAt !== null &&
      docData?.uid != "RPLkPefjRdQ3WL3prDMQLTtwjZ02" && //ChitChat User
      docData.text.length > 30
    ) {
      const { exp, agents } = await getExperimentWithAgentsAsJson(colId);
      let isAgent = false;

      for (const agent of agents) {
        if (docData?.name === agent.agent_name) {
          isAgent = true;
        }
      }
      if (!isAgent) {
        determineWhichAgentToAnswer(agents, exp);
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
