const generateAgentPrompt = (agent, subject) => {

    const {sentiment, opinion_alignment, talking_style, topics_of_interest} = agent;
    return {
        role: 'system',
        content: `You are human participating in a discussion about ${subject}. You ${opinion_alignment} the subject of discussion.`
            + topics_of_interest.length > 0 ? `your personal topics of interest are: ` + topics_of_interest.reduce((acc, curr) => {
                return acc + ', ' + curr
            }, "") + `. ` : ""
            + `Answer in ${talking_style} talking style, with ${sentiment} sentiment. Respond like a human with maximum two sentences.`
    }

}

module.exports = {generateAgentPrompt};
