const {
  createSnaGraph,
  createCSVFromFirestore,
  getGraph,
} = require("../Neo4j/snaGraphHandler");
const { getNumberOfMessages } = require("../AI-Agents/createUserPrompt");
const { publishAgentResponse } = require("../AI-Agents/publishAgentResponse");
const { APIError } = require("../ErrorHaneling/APIError");
const { stringify } = require("csv-stringify");

const createGraph = async (req, res, next) => {
  try {
    const { collection_id, label_name } = req.body;
    await createSnaGraph(collection_id, label_name);
    res.status(200).send("created");
  } catch (err) {
    const apiError = new APIError(err);
    next(apiError, req, res);
  }
};

const getCSV = async (req, res, next) => {
  try {
    const { collection_id } = req.params;
    const data = await createCSVFromFirestore(collection_id);
    stringify(data, (err, output) => {
      if (err) {
        throw new Error(err);
      }
      const bom = "\uFEFF";
      const csvContent = bom + output; // Add BOM to CSV content
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment");
      res.send(csvContent);
    });
  } catch (err) {
    const apiError = new APIError(err);
    next(apiError, req, res);
  }
};

const getSnaGraph = async (req, res, next) => {
  try {
    const collectionId = req.params.id;
    res.status(200).json(await getGraph(collectionId));
  } catch (err) {
    const apiError = new APIError(err);
    next(apiError, req, res);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const collectionId = req.params.id;
    const numberOfMessages = req.params.number;
    res
      .status(200)
      .json(await getNumberOfMessages(collectionId, numberOfMessages));
  } catch (err) {
    const apiError = new APIError(err);
    next(apiError, req, res);
  }
};

const publishMessage = async (req, res, next) => {
  try {
    const collectionId = req.body.id;
    const name = req.body.name;
    const message = req.body.message;
    res
      .status(200)
      .json(await publishAgentResponse(collectionId, message, name));
  } catch (err) {
    const apiError = new APIError(err);
    next(apiError, req, res);
  }
};

module.exports = {
  createGraph,
  getSnaGraph,
  getCSV,
  getMessages,
  publishMessage,
};
