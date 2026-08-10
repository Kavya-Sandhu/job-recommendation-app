async function getRecommendations() {

    const candidate =
        document.getElementById("candidate").value;

    const results =
        document.getElementById("results");

    const loading =
        document.getElementById("loading");

    loading.innerHTML = "Loading recommendations...";

    results.innerHTML = "";

    try {

        const response = await fetch(
            `/api/recommendations?name=${encodeURIComponent(candidate)}`
        );

        const data = await response.json();

        loading.innerHTML = "";

        if (!data.recommendations ||
            data.recommendations.length === 0) {

            results.innerHTML =
                "<p>No matching jobs found.</p>";

            return;
        }

        results.innerHTML = `
            <h2>Recommended Jobs for ${data.candidate}</h2>
        `;

        data.recommendations.forEach(item => {

            const job = item.job;
            const company = item.company;

            const card = document.createElement("div");

            card.className = "job-card";

            card.innerHTML = `

                <h3>${job.title}</h3>

                <p>
                    📍 <strong>Location:</strong>
                    ${job.location}
                </p>

                <p>
                    🏢 <strong>Company:</strong>
                    ${company ? company.name : "Not Available"}
                </p>

                <p>
                    🛠️ <strong>Your Skills:</strong>
                    ${item.candidateSkills.join(", ")}
                </p>

                <p>
                    📋 <strong>Required Skills:</strong>
                    ${item.requiredSkills.join(", ")}
                </p>

                <p>
                    ✅ <strong>Matched Skills:</strong>
                    ${item.matchedSkills.length > 0
                        ? item.matchedSkills.join(", ")
                        : "None"}
                </p>

                <div class="match">
                    Match: ${item.matchPercentage}%
                </div>

            `;

            results.appendChild(card);

        });

    } catch (error) {

        loading.innerHTML = "";

        results.innerHTML =
            `<p class="error">
                Error: ${error.message}
            </p>`;
    }
}