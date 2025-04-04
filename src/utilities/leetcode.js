//! Leetcode Data
const baseURL = "https://alfa-leetcode-api.onrender.com";
async function fetchDataLC(username) {
    try {
        const _solvedProblem = await fetch(`${baseURL}/${username}/solved`);
        const _skills = await fetch(`${baseURL}/skillStats/${username}`);
        const _badges = await fetch(`${baseURL}/${username}/badges`);
        const _contest = await fetch(`${baseURL}/${username}/contest`);
        const _lang = await fetch(`${baseURL}/languageStats?username=${username}`);

        // check only one fetch request
        if (!_solvedProblem.ok) {
            throw new Error(`E001 : HTTP error! Status: ${_solvedProblem.status}`);
        }

        // parse into json
        const solvedProblem = await _solvedProblem.json();
        const skills = await _skills.json();
        const badges = await _badges.json();
        const contest = await _contest.json();
        const lang = await _lang.json();
        
        // combine all the info
        const data = {
            solvedProblem,
            skills, 
            badges,
            contest, 
            lang
        }

        return data;
    } catch (error) {
        console.error('E002:', error);
    }
}

export default fetchDataLC;