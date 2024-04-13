const { getMessages } = require("./getMessagesFirestore")
const { createGraph } = require("./createNeo4jGraph")


async function graphHandler(collectionId, labelName) {
    try {
        const messagesData = await getMessages(collectionId);
        await createGraph(messagesData, labelName);
        console.log("returned from createGraph");
    } catch (error) {
        console.error("Error in graphHandler:", error);
    }
}

graphHandler("messages", "test4").then(() => {
    console.log("Graph handler has completed all operations.");
}).catch(error => {
    console.error("Graph handler encountered an error:", error);
});

