const {
  talkingStyles,
  opinionAlignment,
  sentimentOptions,
  talkingStylesPrompt,
  opinionAlignmentPrompt,
  sentimentOptionsPrompt,
} = require("../constants");

const generateAgentPrompt = (agent, subject) => {
  let opinion = "";
  let sentiment = " ";
  let talking_style = "";

  if (agent.opinion_alignment === opinionAlignment.SUPPORT) {
    opinion = opinionAlignmentPrompt.SUPPORT;
  } else {
    opinion = opinionAlignmentPrompt.AGAINST;
  }

  if (agent.sentiment == sentimentOptions.POSITIVE) {
    sentiment = sentimentOptionsPrompt.POSITIVE;
  } else {
    sentiment = sentimentOptionsPrompt.NEGATIVE;
  }

  if (agent.talking_style === talkingStyles.SARCASTIC) {
    talking_style = talkingStylesPrompt.SARCASTIC;
  } else if (agent.talking_style === talkingStyles.EMPHATIC) {
    talking_style = talkingStylesPrompt.EMPHATIC;
  } else if (agent.talking_style === talkingStyles.RESERVED) {
    talking_style = talkingStylesPrompt.RESERVED;
  } else if (agent.talking_style === talkingStyles.AGGRESIVE) {
    talking_style = talkingStylesPrompt.AGGRESIVE;
  } else {
    talking_style = talkingStylesPrompt.CHARISMATIC;
  }

  const content =
    `You are impersonating a person named ${agent.agent_name} that participating in a chat discussion about ${subject}.` +
    "the participants have Average English skills so you should have too.\n" +
    opinion +
    "\n" +
    sentiment +
    "\n" +
    talking_style +
    "\nyour answer should be maximum 2 sentences, everyone need to think that you are a human. Don't use punctuations at all, and have some typos.";

  return {
    role: "system",
    content: content,
  };
};

module.exports = { generateAgentPrompt };
