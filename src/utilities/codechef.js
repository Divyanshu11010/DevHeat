//! Codechef
const baseURL = "https://codechef-api.vercel.app/handle";
async function fetchDataCC(username) {
    try {
        const _data = await fetch(`${baseURL}/${username}`)

        // check only one fetch request
        if (!_data.ok) {
            throw new Error(`E003 : HTTP error! Status: ${_data.status}`);
        }
        
        const {success, status, profile, name, countryName, countryFlag, ...data} = await _data.json();
        return data;
    } catch (error) {
        console.error('E004:', error);
    }
}

export default fetchDataCC;