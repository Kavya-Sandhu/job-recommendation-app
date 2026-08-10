const express = require("express");
const cors = require("cors");
const neo4j = require("neo4j-driver");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.static("."));

const driver = neo4j.driver(
    "bolt+s://db-27aad0a5.databases.cognodb.com",
    neo4j.auth.basic(
        "cognodb",
        "bef4926f49c591aeed776bcc63309e60"
    )
);

// Test connection
app.get("/api/test", async (req, res) => {

    const session = driver.session();

    try {

        const result = await session.run(`
            RETURN "CognoDB connection successful" AS message
        `);

        res.json({
            message: result.records[0].get("message")
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    } finally {

        await session.close();

    }
});

// GET ALL JOBS WITH COMPANY AND REQUIRED SKILLS

app.get("/api/jobs", async (req, res) => {

    const session = driver.session();

    try {

        const result = await session.run(`
            MATCH (j:Job)-[:POSTED_BY]->(c:Company)
            OPTIONAL MATCH (j)-[:REQUIRES_SKILL]->(s:Skill)

            RETURN
                properties(j) AS job,
                properties(c) AS company,
                collect(properties(s)) AS skills
        `);

        const jobs = result.records.map(record => ({
            job: record.get("job"),
            company: record.get("company"),
            skills: record.get("skills")
        }));

        res.json(jobs);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    } finally {

        await session.close();

    }
});



app.get("/api/recommendations", async (req, res) => {

    const session = driver.session();

    try {

        const candidateName = req.query.name || "Kavya";

        const result = await session.run(`
            MATCH (p:Person {name: $candidateName})
                  -[:HAS_SKILL]->(candidateSkill:Skill)

            WITH p, collect(DISTINCT candidateSkill.name) AS candidateSkills

            MATCH (j:Job)-[:REQUIRES_SKILL]->(requiredSkill:Skill)

            WITH
                p,
                candidateSkills,
                j,
                collect(DISTINCT requiredSkill.name) AS requiredSkills

            OPTIONAL MATCH (j)-[:POSTED_BY]->(company:Company)

            WITH
                p,
                candidateSkills,
                j,
                company,
                requiredSkills,
                [skill IN requiredSkills
                 WHERE skill IN candidateSkills] AS matchedSkills

            RETURN
                properties(j) AS job,
                properties(company) AS company,
                candidateSkills,
                requiredSkills,
                matchedSkills,
                CASE
                    WHEN size(requiredSkills) = 0 THEN 0
                    ELSE round(
                        toFloat(size(matchedSkills))
                        / size(requiredSkills) * 100
                    )
                END AS matchPercentage

            ORDER BY matchPercentage DESC
        `, {
            candidateName: candidateName
        });

        const recommendations = result.records.map(record => ({
            job: record.get("job"),
            company: record.get("company"),
            candidateSkills: record.get("candidateSkills"),
            requiredSkills: record.get("requiredSkills"),
            matchedSkills: record.get("matchedSkills"),
            matchPercentage: record.get("matchPercentage")
        }));

        res.json({
            candidate: candidateName,
            recommendations: recommendations
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    } finally {

        await session.close();

    }
});

// GET CANDIDATES

app.get("/api/candidates", async (req, res) => {

    const session = driver.session();

    try {

        const result = await session.run(`
            MATCH (c:Candidate)
            RETURN properties(c) AS candidate
        `);

        const candidates = result.records.map(record =>
            record.get("candidate")
        );

        res.json(candidates);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    } finally {

        await session.close();

    }
});

// CHECK CANDIDATE/PERSON NAMES
app.get("/api/names", async (req, res) => {

    const session = driver.session();

    try {

        const result = await session.run(`
            MATCH (n)
            WHERE n.name IN [
                "Kavya",
                "Hemanth",
                "Jeswitha",
                "Naveen",
                "Rohitha"
            ]

            RETURN
                labels(n) AS labels,
                properties(n) AS properties
        `);

        const data = result.records.map(record => ({
            labels: record.get("labels"),
            properties: record.get("properties")
        }));

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    } finally {

        await session.close();

    }
});

// CHECK ALL DATABASE DATA

app.get("/api/all-data", async (req, res) => {

    const session = driver.session();

    try {

        const result = await session.run(`
            MATCH (n)
            RETURN
                labels(n) AS labels,
                properties(n) AS properties
        `);

        const data = result.records.map(record => ({
            labels: record.get("labels"),
            properties: record.get("properties")
        }));

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    } finally {

        await session.close();

    }
});

// PERSON SKILL
app.get("/api/person-skills", async (req, res) => {

    const session = driver.session();

    try {

        const result = await session.run(`
            MATCH (p:Person)-[r]-(s:Skill)

            RETURN
                properties(p) AS person,
                type(r) AS relationship,
                properties(s) AS skill
        `);

        const data = result.records.map(record => ({
            person: record.get("person"),
            relationship: record.get("relationship"),
            skill: record.get("skill")
        }));

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    } finally {

        await session.close();

    }
});

app.listen(PORT, () => {

    console.log(
        `Job Recommendation App running at http://localhost:${PORT}`
    );

});