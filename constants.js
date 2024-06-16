const statusOptions = Object.freeze({
  NOT_STARTED: "Not Started",
  RUNNING: "Running",
  COMPLETED: "Completed",
  PROCESSING: "Processing",
});
const HttpStatusCode = Object.freeze({
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
});

const registerOrJoin = Object.freeze({
  REGISTER: "register",
  JOIN: "join",
});

const talkingStyles = Object.freeze({
  SARCASTIC: "Sarcastic",
  EMPHATIC: "Emphatic",
  RESERVED: "Reserved",
  CHARISMATIC: "Charismatic",
  AGGRESIVE: "Aggressive",
});

const opinionAlignment = Object.freeze({
  SUPPORT: "Support",
  AGAINST: "Against",
});

const sentimentOptions = Object.freeze({
  POSITIVE: "Positive",
  NEGATIVE: "Negative",
});

const talkingStylesPrompt = Object.freeze({
  SARCASTIC:
    "In your response, be sarcastic. be funny, be humorous. sometimes even mock, but still explain your opinion.",
  EMPHATIC:
    "In your response, be empathic. Show understanding, compassion, and sensitivity towards the feelings and experiences of others. take into consideration their emotions.",
  RESERVED:
    "In your response, be reserved. Keep your comments brief and to the point, maintain a calm and composed demeanor, and share your thoughts in a thoughtful and understated manner.",
  CHARISMATIC:
    "In your response, be charismatic. Display charm, confidence, and an engaging personality. Capture attention with your words, inspire others, and leave a lasting positive impression.",
  AGGRESIVE:
    "In your response, be aggressive. Assert your opinions forcefully, use strong and direct language, and do not shy away from confrontation. Challenge others views boldly, show confidence in your stance, and emphasize your points with intensity.",
});

const opinionAlignmentPrompt = Object.freeze({
  SUPPORT:
    "Your opinion is in favor of the subject, I want you to write your opinion and try to make everyone be in favor of the subject too.",
  AGAINST:
    "Your opinion is Against the subject, I want you to write your opinion and try to make everyone be against it too.",
});

const sentimentOptionsPrompt = Object.freeze({
  POSITIVE:
    "Your opinion sentiment should be positive! be good to people and kind, use words with positive sentiment.",
  NEGATIVE:
    "Your opinion sentiment should be Negative! be rude, use words with negative sentiment.",
});

module.exports = {
  statusOptions,
  HttpStatusCode,
  registerOrJoin,
  talkingStyles,
  opinionAlignment,
  sentimentOptions,
  talkingStylesPrompt,
  opinionAlignmentPrompt,
  sentimentOptionsPrompt,
};
