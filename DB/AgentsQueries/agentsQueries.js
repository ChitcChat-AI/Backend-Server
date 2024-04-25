const db = require("../DB");

const creatAgent = async (exp_id, agent_name, opinion_alignment, talking_style, activity_level, topics_of_interest, messages_to_reply) => {
    const {rows} = await db.query(
        "INSERT INTO agents (agent_name, opinion_alignment, talking_style, activity_level, topics_of_interest, messages_to_reply ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [agent_name, opinion_alignment, talking_style, activity_level, topics_of_interest, messages_to_reply]
    );
    const {agent_id} = rows[0]

    return rows[0];
}