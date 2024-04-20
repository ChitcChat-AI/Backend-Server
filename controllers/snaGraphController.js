const { createSnaGraph, createCSVFromFirestore, getGraph } = require('../Neo4j/snaGraphHandler');
const queries = require("../DB/Queries");

const createGraph = async (req, res) => {
    const {collection_id, label_name} = req.body;
    await createSnaGraph(collection_id, label_name);
    res.status(200).send('created');
}

const getCSV = async (req, res) => {
    try {
        const {collection_id, experiment_name} = req.params;
        const csvContent = await createCSVFromFirestore(experiment_name);
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
module.exports={
    createGraph,
    getSnaGraph,
    getCSV
}
