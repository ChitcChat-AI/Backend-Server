const { driver } = require("./neo4j");
const { getSentiment } = require("./getSentimentGCP");
const { analyzeSentiment } = require("./sentimentExtractor");

async function createGraph(messagesData, projectName) {
  const session = driver.session();
  const tx = session.beginTransaction();
  try {
    for (let i = 1; i < messagesData.length; i++) {
      const nodeName = messagesData[i].name;
      let sentimentScore = messagesData[i].sentimentScore;

      await tx.run(
        "MERGE (a:Person {name: $name, project: $project, uid:$uid}) RETURN a",
        {
          name: nodeName,
          project: projectName,
          uid: messagesData[i].uid,
        }
      );
      if (!sentimentScore) {
        console.log("sentiment Score undefined when creating graph");
        sentimentScore = 0;
      }
      let sentimentLabel;
      if (sentimentScore <= -0.3) sentimentLabel = "negative";
      else if (sentimentScore >= 0.3) sentimentLabel = "positive";
      else sentimentLabel = "natural";
      await tx.run(
        "MATCH (a:Person {name: $fromName, project: $project}), (b:Person {name: $toName, project: $project}) " +
          `MERGE (a)-[r:${sentimentLabel} {message: $message, sentimentScore: $score}]->(b)`,
        {
          fromName: nodeName,
          toName: messagesData[i - 1].name,
          project: projectName,
          message: messagesData[i].text,
          score: sentimentScore,
        }
      );
    }

    // Commit transaction
    await tx.commit();
  } catch (error) {
    console.error("Error creating graph:", error);
  } finally {
    if (tx) {
      await tx.close();
    }
    await session.close();
  }
}

module.exports = { createGraph };
