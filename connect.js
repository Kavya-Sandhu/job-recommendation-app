const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
    process.env.COGNODB_URI,
    neo4j.auth.basic(
        process.env.COGNODB_USERNAME,
        process.env.COGNODB_PASSWORD
   )
);
async function testConnection() {

    const session = driver.session();

    try {
        await driver.verifyConnectivity();

        console.log("Connected to CognoDB successfully!");

        const result = await session.run(
            "CREATE (n:Test {message: 'Hello CognoDB'}) RETURN n"
        );

        console.log("First Cypher query executed successfully!");

        console.log(
            result.records[0].get("n").properties
        );

    } catch (error) {

        console.error("Connection failed:", error.message);

    } finally {

        await session.close();
        await driver.close();

    }
}

testConnection();
