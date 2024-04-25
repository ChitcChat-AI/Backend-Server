const {collection, query, orderBy, getDocs, limit} = require("firebase/firestore");
const {db} = require("../Neo4j/firebase");


async function getNumberOfMessages(collectionId, numberOfMessages) {
    const messages = collection(db, collectionId);
    let messagesData = [];
    try {
        const messagesQuery = query(messages, orderBy('createdAt', 'desc'), limit(numberOfMessages));
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

module.exports = { getNumberOfMessages };
