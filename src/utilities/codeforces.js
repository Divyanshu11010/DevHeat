//! Codechef
const baseURL = "https://codeforces.com/api";
async function fetchDataCF(username) {
    try {
        const _info = await fetch(`${baseURL}/user.info?handles=${username}`);
        const _problems = await fetch(`${baseURL}/user.status?handle=${username}`);

        // check only one fetch request
        if (!_info.ok) {
            throw new Error(`E005 : HTTP error! Status: ${_info.status}`);
        }


        const info = await _info.json();
        const problems = await _problems.json();

        let solved = new Array;
        problems.result.forEach(obj => {
            if (obj.problem) { 
                const { rating, tags } = obj.problem;
                solved.push({ rating, tags });
            }
        });

        return {info, solved};
    } catch (error) {
        console.error('E006:', error);
    }
}

export default fetchDataCF;