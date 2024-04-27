const {collection, query, orderBy, getDocs, limit, where} = require("firebase/firestore");
const {db} = require("../DB/firebase");


async function createUserPrompt(collectionId, numberOfMessages, agentName) {
    const messages = collection(db, collectionId);
    let messagesData = [];
    try {
        const messagesQuery = query(messages, orderBy('createdAt', 'desc') ,limit(numberOfMessages));
        const messagesList = await getDocs(messagesQuery);
        messagesList.forEach(doc => {
            messagesData.push({
                role: "user",
                content: doc.data().text
            });
        });
        return messagesData;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
}

module.exports = { createUserPrompt };
