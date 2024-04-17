const natural = require('natural');
const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
const tokenizer = new natural.WordTokenizer();

function analyzeSentiment(sentence) {
    const tokens = tokenizer.tokenize(sentence);
    return analyzer.getSentiment(tokens);
}

module.exports = { analyzeSentiment };

