const queries = require('../DB/Queries');


const createResearcher = async (req, res) => {
    const {researcher_id, researcher_name, researcher_email, researcher_photo_url} = req.body;
    res.status(200).json(await queries.createResearcher(researcher_id, researcher_name, researcher_email, researcher_photo_url));
}

const getResearcherById = async (req, res) => {
    const researcher_id = req.params.id;
    res.status(200).json(await queries.getResearcherById(researcher_id));
}

module.exports = {
    createResearcher,
    getResearcherById
}