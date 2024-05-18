const { getMessages } = require("./getMessagesFirestore");
const { Timestamp } = require("firebase/firestore"); // If you're using Timestamp from Firebase
const { parse } = require("json2csv");

function convertToCSV(objects) {
  const headers = ["name", "sentiment", "text", "sentAt"];
  let rows = [headers];
  objects.map((obj) => {
    const formattedDate = new Date(
      obj.createdAt.toDate().toISOString()
    ).toLocaleString();
    rows.push([obj.name, obj.sentimentScore, obj.text, formattedDate]);
  });

  return rows;
}

async function createCSV(collectionId) {
  const messagesList = await getMessages(collectionId);
  const csvContent = convertToCSV(messagesList);
  return csvContent;
}

module.exports = { createCSV };
