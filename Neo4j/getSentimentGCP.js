const axios = require('axios');
require('dotenv').config();

async function analyzeSentiment(text) {
    const url = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${process.env.GCP_API_KEY}`;
    const data = {
        document: {
            type: 'PLAIN_TEXT',
            content: text
        },
        encodingType: 'UTF8'
    };

    try {
        const response = await axios.post(url, data);
        return response.data.documentSentiment;
    } catch (error) {
        console.error('Sentiment analysis error:', error);
        return null;
    }
}


module.exports = { analyzeSentiment };

