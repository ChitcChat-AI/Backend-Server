const researcherQueries = require("../DB/researcherQueries/researcherQueries");
module.exports = {

    authUser: async (request, accessToken, refreshToken, profile, done) => {
        try {
            let user = await researcherQueries.getResearcherById(profile.id);
            if (user) {
                return done(null, user);
            }
            user = await researcherQueries.creatResearcher(profile.id,profile.displayName, profile.emails[0].value, profile.photos[0].value)
            done(null, user);
        } catch (err) {
            done(err, false, err.message);
        }
    },

    unAuthorized: async (req,res) => {
        res.status(403).send('User login required!')
    }

}