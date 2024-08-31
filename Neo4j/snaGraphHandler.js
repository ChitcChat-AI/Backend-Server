const { getMessages } = require("./getMessagesFirestore")
const { createGraph } = require("./createNeo4jGraph")
const { createCSV } = require("./createCSV")
const { retrieveGraph } = require("./getSnaGraph")

async function createSnaGraph(collectionId, labelName) {
    try {
        const messagesData = await getMessages(collectionId);
        await createGraph(messagesData, labelName);
    } catch (error) {
        console.error("Error in graphHandler:", error);
    }
}

async function createCSVFromFirestore(collectionId) {
    return await createCSV(collectionId);
}

async function getGraph(collectionId) {
    return await retrieveGraph(collectionId);
}

module.exports = { createSnaGraph, getGraph, createCSVFromFirestore };
