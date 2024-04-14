const axios = require('axios');
require('dotenv').config();

async function translateText(text) {
    const url = `https://translation.googleapis.com/language/translate/v2`;
    const params = {
        q: text,
        source: 'he',
        target: 'en',
        key: process.env.GCP_API_KEY,
        format: 'text'
    };

    try {
        const response = await axios.post(url, null, { params });
        return response.data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return null;
    }
}

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

async function translateAndAnalyzeSentiment(text) {
    const translatedText = await translateText(text);
    console.log(`Translated Text: ${translatedText}`);
    return await analyzeSentiment(translatedText);
}

module.exports = { translateAndAnalyzeSentiment };
