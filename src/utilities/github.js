//! GitHub Data
const githubBaseURL = "https://api.github.com/users";

async function fetchDataGitHub(username) {
    try {
        const userResponse = await fetch(`${githubBaseURL}/${username}`);
        const reposResponse = await fetch(`${githubBaseURL}/${username}/repos`);
        const eventsResponse = await fetch(`${githubBaseURL}/${username}/events`);
        const contributionsResponse = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);

        // Check if the user fetch request was successful
        if (!userResponse.ok) {
            throw new Error(`E007 : HTTP error! Status: ${userResponse.status}`);
        }

        // Parse responses into JSON
        const userData = await userResponse.json();
        const reposData = await reposResponse.json();
        const eventsData = await eventsResponse.json();
        const contributionsData = await contributionsResponse.json();

        // Extract repository statistics
        const repoStats = reposData.map(repo => ({
            name: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            watchers: repo.watchers_count,
            language: repo.language,
        }));

        // Calculate total popularity metrics
        const totalStars = repoStats.reduce((acc, repo) => acc + repo.stars, 0);
        const totalForks = repoStats.reduce((acc, repo) => acc + repo.forks, 0);
        const totalWatchers = repoStats.reduce((acc, repo) => acc + repo.watchers, 0);

        // Count occurrences of each language
        const languageStats = repoStats.reduce((acc, repo) => {
            if (repo.language) {
                acc[repo.language] = (acc[repo.language] || 0) + 1;
            }
            return acc;
        }, {});

        // Process events to count PRs
        const totalPRs = eventsData.filter(event => event.type === "PullRequestEvent").length;

        // Extract all active contribution days and total contributions per year
        const yearlyContributions = {};
        if (contributionsData.contributions) {
            contributionsData.contributions.forEach(entry => {
                if (entry.count > 0) {
                    const year = entry.date.split('-')[0];
                    if (!yearlyContributions[year]) {
                        yearlyContributions[year] = { activeDays: 0, totalContributions: 0 };
                    }
                    yearlyContributions[year].activeDays += 1;
                    yearlyContributions[year].totalContributions += entry.count;
                }
            });
        }

        // Combine all extracted data
        const data = {
            publicRepos: userData.public_repos,
            yearlyContributions,
            followers: userData.followers,
            techStacks: languageStats,
            popularity: {
                stars: totalStars,
                forks: totalForks,
                watchers: totalWatchers
            },
            totalPRs
        };

        return data;
    } catch (error) {
        console.error('E008:', error);
    }
}

export default fetchDataGitHub;
