const {driver} = require("./neo4j")


async function retrieveGraph(collectionId) {
    const session = driver.session();
    try {
        const result = await session.run(
            'MATCH (p:Person)-[r]->(q:Person) ' +
            'WHERE p.project = $label_name AND q.project = $label_name ' +
            'RETURN p, r, q',
            { label_name: collectionId }
        );

        return result;

    } catch (error) {
        console.error('Error retrieving graph:', error);
        throw error;
    } finally {
        await session.close();
    }
}

module.exports = { retrieveGraph };

