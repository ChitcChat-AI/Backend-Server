export const generateAgentPrompt = (agentId) => {

    const {sentiment, subject, opinion_alignment, talking_style, topics_of_interest} = agentConfig;
    return {
        role: 'system',
        content: `You participate in a discussion about ${subject}. You ${opinion_alignment} the subject of discussion`
            + `your personal topics of interest are: ` + topics_of_interest.reduce((acc, curr) => {
                return acc + ', ' + curr
            }, "") + `. `
            + `Answer in ${talking_style} talking style, with ${sentiment} sentiment. Respond like a human with maximum two sentences.`
    }

}