const { createSnaGraph, createCSVFromFirestore, getGraph } = require('../Neo4j/snaGraphHandler');
const { getNumberOfMessages } = require('../AI-Agents/createUserPrompt');
const { publishAgentResponse } = require('../AI-Agents/publishAgentResponse');

const createGraph = async (req, res) => {
    const {collection_id, label_name} = req.body;
    await createSnaGraph(collection_id, label_name);
    res.status(200).send('created');
}

const getCSV = async (req, res) => {
    try {
        const {collection_id, experiment_name} = req.params;
        const csvContent = await createCSVFromFirestore(collection_id);
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${experiment_name}.csv"`);
        res.send(csvContent);
    } catch (error) {
        console.error('Error generating CSV:', error);
        res.status(500).send('Error generating CSV');
    }
}

const getSnaGraph = async  (req, res) => {
    const collectionId = req.params.id;
    res.status(200).json(await getGraph(collectionId));

}

const getMessages = async  (req, res) => {
    const collectionId = req.params.id;
    const numberOfMessages = req.params.number;
    res.status(200).json(await getNumberOfMessages(collectionId, numberOfMessages));
}

const publishMessage = async  (req, res) => {
    const collectionId = req.body.id;
    const name = req.body.name;
    const message = req.body.message;
    res.status(200).json(await publishAgentResponse(collectionId, message, name));
}

module.exports={
    createGraph,
    getSnaGraph,
    getCSV,
    getMessages,
    publishMessage
}
