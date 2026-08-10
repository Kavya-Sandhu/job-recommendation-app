const neo4j = require("neo4j-driver");

// CognoDB connection
const driver = neo4j.driver(
    "bolt+s://db-27aad0a5.databases.cognodb.com",
    neo4j.auth.basic("cognodb", "bef4926f49c591aeed776bcc63309e60")
);

// Seed database
async function seedDatabase() {
    const session = driver.session();

    try {
        console.log("Connected to CognoDB successfully!");
        await session.run(`
            MATCH (n:Test)
            DELETE n
        `);
        
        //  Create Person nodes
        await session.run(`
            UNWIND [
                {name: "Kavya", experience: 1, location: "Hyderabad"},
                {name: "Hemanth", experience: 2, location: "Bangalore"},
                {name: "Jeswitha", experience: 3, location: "Chennai"},
                {name: "Naveen", experience: 4, location: "Hyderabad"},
                {name: "Rohitha", experience: 2, location: "Pune"}
            ] AS person

            MERGE (p:Person {name: person.name})
            SET p.experience = person.experience,
                p.location = person.location
        `);

        //  Create Skill nodes
        await session.run(`
            UNWIND [
                "JavaScript",
                "React",
                "Node.js",
                "Python",
                "Java",
                "SQL",
                "HTML",
                "CSS"
            ] AS skillName

            MERGE (s:Skill {name: skillName})
        `);

        //  Create Company nodes
        
        await session.run(`
            UNWIND [
                {name: "Wexa AI", location: "Hyderabad"},
                {name: "Infosys", location: "Bangalore"},
                {name: "Accenture", location: "Chennai"},
                {name: "Wipro", location: "Pune"}
            ] AS company

            MERGE (c:Company {name: company.name})
            SET c.location = company.location
        `);

        //  Create Job nodes
        
        await session.run(`
            UNWIND [
                {
                    title: "Frontend Developer",
                    experience: 0,
                    location: "Hyderabad"
                },
                {
                    title: "Backend Developer",
                    experience: 1,
                    location: "Bangalore"
                },
                {
                    title: "Full Stack Developer",
                    experience: 1,
                    location: "Hyderabad"
                },
                {
                    title: "Java Developer",
                    experience: 2,
                    location: "Chennai"
                },
                {
                    title: "Data Analyst",
                    experience: 1,
                    location: "Pune"
                },
                {
                    title: "Python Developer",
                    experience: 1,
                    location: "Bangalore"
                }
            ] AS job

            MERGE (j:Job {title: job.title})
            SET j.experience = job.experience,
                j.location = job.location
        `);

        //  Person -> HAS_SKILL -> Skill
        await session.run(`
            UNWIND [
                ["Kavya", "JavaScript"],
                ["Kavya", "React"],
                ["Kavya", "HTML"],
                ["Kavya", "CSS"],

                ["Hemanth", "JavaScript"],
                ["Hemanth", "Node.js"],
                ["Hemanth", "SQL"],

                ["Jeswitha", "Python"],
                ["Jeswitha", "SQL"],
                ["Jeswitha", "HTML"],

                ["Naveen", "Java"],
                ["Naveen", "SQL"],

                ["Rohitha", "Python"],
                ["Rohitha", "JavaScript"],
                ["Rohitha", "React"]
            ] AS data

            MATCH (p:Person {name: data[0]})
            MATCH (s:Skill {name: data[1]})
            MERGE (p)-[:HAS_SKILL]->(s)
        `);

        //  Job -> REQUIRES_SKILL -> Skill
        
        await session.run(`
            UNWIND [
                ["Frontend Developer", "JavaScript"],
                ["Frontend Developer", "React"],
                ["Frontend Developer", "HTML"],
                ["Frontend Developer", "CSS"],

                ["Backend Developer", "Node.js"],
                ["Backend Developer", "JavaScript"],
                ["Backend Developer", "SQL"],

                ["Full Stack Developer", "JavaScript"],
                ["Full Stack Developer", "React"],
                ["Full Stack Developer", "Node.js"],
                ["Full Stack Developer", "SQL"],

                ["Java Developer", "Java"],
                ["Java Developer", "SQL"],

                ["Data Analyst", "Python"],
                ["Data Analyst", "SQL"],

                ["Python Developer", "Python"],
                ["Python Developer", "SQL"]
            ] AS data

            MATCH (j:Job {title: data[0]})
            MATCH (s:Skill {name: data[1]})
            MERGE (j)-[:REQUIRES_SKILL]->(s)
        `);

        //  Job -> POSTED_BY -> Company
        await session.run(`
            UNWIND [
                ["Frontend Developer", "Wexa AI"],
                ["Backend Developer", "Infosys"],
                ["Full Stack Developer", "Accenture"],
                ["Java Developer", "Wipro"],
                ["Data Analyst", "TCS"],
                ["Python Developer", "Infosys"]
            ] AS data

            MATCH (j:Job {title: data[0]})
            MATCH (c:Company {name: data[1]})
            MERGE (j)-[:POSTED_BY]->(c)
        `);

        //  Person -> APPLIED_TO -> Job
        
        await session.run(`
            UNWIND [
                ["Kavya", "Frontend Developer"],
                ["Rahul", "Backend Developer"],
                ["Anjali", "Data Analyst"],
                ["Arjun", "Java Developer"],
                ["Sneha", "Python Developer"]
            ] AS data

            MATCH (p:Person {name: data[0]})
            MATCH (j:Job {title: data[1]})
            MERGE (p)-[:APPLIED_TO]->(j)
        `);

        console.log("Job recommendation data inserted successfully!");
        const result = await session.run(`
            MATCH (n)
            RETURN labels(n) AS type, count(n) AS count
            ORDER BY type
        `);

        console.log("\nDatabase summary:");

        result.records.forEach(record => {
            console.log(
                record.get("type"),
                "=>",
                record.get("count").toNumber()
            );
        });

    } catch (error) {
        console.error("Seeding failed:", error.message);

    } finally {
        await session.close();
        await driver.close();
    }
}

seedDatabase();