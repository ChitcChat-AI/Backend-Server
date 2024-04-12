const {db} = require("./firebase")
const {query, orderBy, collection, getDocs} = require("firebase/firestore");
const {driver} = require("./neo4j")
const {logging} = require("neo4j-driver");
const messages = collection(db, "messages");


async function getMessages() {
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

async function createGraph(messagesData, projectName) {
    const session = driver.session();
    try {
        const tx = session.beginTransaction();

        let lastNodeName = null;
        for (let i = 1; i < messagesData.length; i++) {
            const nodeName = messagesData[i].name;
            const messageText = messagesData[i].text;
            const lastNodeName = messagesData[i - 1].name;

            // Merge nodes with the project name property
            await tx.run('MERGE (a:Person {name: $name, project: $project}) RETURN a', {
                name: nodeName,
                project: projectName
            });

            // Ensure relationships are created within the same project
            await tx.run('MATCH (a:Person {name: $fromName, project: $project}), (b:Person {name: $toName, project: $project}) ' +
                'MERGE (a)-[r:ANSWERED {message: $message}]->(b)', {
                fromName: nodeName,
                toName: lastNodeName,
                project: projectName,
                message: messageText,
            });
        }

        // Commit transaction
        await tx.commit();
    } catch (error) {
        console.error("Error creating graph:", error);
        await session.close();
        return;
    }

    console.log("Graph created successfully!");
    await session.close();
}

// Calling getMessages and logging the result to console
getMessages().then(messagesData => {
    createGraph(messagesData, "test2").then(r => console.log("returned from createGraph"));
    // Logs the array of message data
});
