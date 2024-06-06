const generateAgentPrompt = (agent, subject) => {
  let opinion = "";
  let sentiment = " ";
  let talking_style = "";

  if (agent.opinion_alignment === "Support") {
    opinion =
      "Your opinion is in favor of the subject, I want you to write your opinion and try to make everyone be in favor of the subject too.";
  } else {
    opinion =
      "Your opinion is Against the subject, I want you to write your opinion and try to make everyone be against it too.";
  }

  if (agent.sentiment == "Positive") {
    sentiment =
      "Your opinion sentiment should be positive! be good to people and kind, use words with positive sentiment.";
  } else {
    sentiment =
      "Your opinion sentiment should be Negative! be rude, use words with negative sentiment.";
  }

  if (agent.talking_style === "Sarcastic") {
    talk_style =
      "In your respond, be sarcastic. be funny, be humorous. sometimes even mock, but still explain your opinion.";
  } else if (talking_style === "Emphatic") {
    talk_style =
      "In your respond, be empathic. Show understanding, compassion, and sensitivity towards the feelings and experiences of others. take into consideration their emotions.";
  } else {
    talk_style =
      "In your respond, be charismatic. Display charm, confidence, and an engaging personality. Capture attention with your words, inspire others, and leave a lasting positive impression.";
  }

  const content =
    `You are impersonating a person named ${agent.agent_name} that participating in a chat discussion about ${subject}.` +
    "the participants have Average English skills so you should have too.\n" +
    opinion +
    "\n" +
    sentiment +
    "\n" +
    talking_style +
    "\nyour answer should be maximum 3 sentences, everyone need to think that you are a human. Don't use punctuations at all, and have some typos.";
  console.log(content);
  return {
    role: "system",
    content: content,
  };
};

module.exports = { generateAgentPrompt };
