const db = require("../DB");

module.exports = {
    getExperimentsByResearcherId : async (id) => {
        const {rows} = await db.query(
            `SELECT e.*
                FROM experiments e
                INNER JOIN study_experiment se ON e.exp_id= se.exp_id
                INNER JOIN studies s ON s.study_id = se.study_id
                INNER JOIN researcher_study rs ON rs.study_id = se.study_id
                WHERE researcher_id = $1;`, [id]
        )
        return rows;
    },
}