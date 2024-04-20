const {driver} = require("./neo4j")
const { analyzeSentiment } = require("./getSentimentGCP")

function containsEnglishChars(str) {
    return /[a-zA-Z]/.test(str);
}
async function createGraph(messagesData, projectName) {
    const session = driver.session();
    const tx = session.beginTransaction();
    try {
        let lastNodeName = null;
        for (let i = 1; i < messagesData.length; i++) {
            const nodeName = messagesData[i].name;
            const messageText = messagesData[i].text;
            const lastNodeName = messagesData[i - 1].name;

            await tx.run('MERGE (a:Person {name: $name, project: $project}) RETURN a', {
                name: nodeName,
                project: projectName
            });
            let sentiment = {score: 0};
            if (containsEnglishChars(messageText)) {
                sentiment = await analyzeSentiment(messageText);
                console.log("sentiment:" + sentiment.score);
                console.log(messageText)
            }

            let sentimentScore = sentiment.score;

            let sentimentLabel;
            if(sentimentScore < -0.3)
                sentimentLabel = "negative";
            else if(sentimentScore > 0.3)
                sentimentLabel = "positive";
            else
                sentimentLabel = "natural";
            await tx.run('MATCH (a:Person {name: $fromName, project: $project}), (b:Person {name: $toName, project: $project}) ' +
                `MERGE (a)-[r:${sentimentLabel} {message: $message, sentimentScore: $score}]->(b)`, {
                fromName: nodeName,
                toName: lastNodeName,
                project: projectName,
                message: messageText,
                score: sentimentScore,
            });
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
