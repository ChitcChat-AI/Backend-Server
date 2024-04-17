const {collection, query, orderBy, getDocs} = require("firebase/firestore");
const {db} = require("./firebase");


async function getMessages(collectionId) {
    const messages = collection(db, collectionId);
    let messagesData = []; // Initialize an empty array to store message data
    try {
        const messagesQuery = query(messages, orderBy('createdAt'));
        const messagesList = await getDocs(messagesQuery);
        messagesList.forEach(doc => {
            messagesData.push(doc.data()); // Push each document's data to the array
        });
        return messagesData; // Return the array containing all messages
    } catch (error) {
        console.error("Error fetching messages:", error);
        return []; // Return an empty array in case of an error
    }
}

module.exports = { getMessages };
