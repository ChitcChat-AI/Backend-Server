const { getMessages } = require("./getMessagesFirestore")
const { Timestamp } = require('firebase/firestore'); // If you're using Timestamp from Firebase
const { parse } = require('json2csv');

function convertToCSV(objects) {
    const headers = ['name', 'text', 'sentAt'];
    const rows = objects.map(obj => {
        const createdAtDate = obj.createdAt.toDate();
        const sentAt = createdAtDate.toISOString();
        return `name:${obj.name}, text:"${obj.text}", sentAt:${sentAt}`;
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    return csvContent;
}
// function convertToCSV(objects) {
//     const headers = ['name', 'text', 'sentAt'];
//     const rows = objects.map(obj => {
//         const createdAtDate = obj.createdAt.toDate();
//         const sentAt = createdAtDate.toISOString();
//         return `"${obj.name}","${obj.text}","${sentAt}"`;
//     });
//
//     const csvContent = [headers.join(','), ...rows].join('\n');
//     return csvContent;
// }


async function createCSV(collectionId) {
    const messagesList = await getMessages(collectionId);
    const csvContent = convertToCSV(messagesList);
    return csvContent;
}


module.exports ={createCSV};

