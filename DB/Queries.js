const db = require("./DB");


const createExperiment  = async (subject, prompt) =>
{
    return await db.query(
        "INSERT INTO experiments (exp_subject, exp_provoking_prompt) VALUES ($1, $2)",
        [subject, prompt]
    );
}

createExperiment("test_subject2", "test_prompt2").then((r) => console.log(r));