import _fetchDataLC from "../utilities/leetcode.js"
import _fetchDataCC from "../utilities/codechef.js"
import _fetchDataCF from "../utilities/codeforces.js"
import _fetchDataGitHub from "../utilities/github.js"
import _getUnipileProfile from "../utilities/linkedin.js"
import getAnalysis from "../utilities/insights.js"

import { Router } from "express";
const router = new Router;

router.post("/analyze", async (req, res) => {
    try {
        const { leetcode, codechef, codeforces, github, linkedin } = req.body;

        const fetchDataLC = await _fetchDataLC(leetcode);
        const fetchDataCC = await _fetchDataCC(codechef);
        const fetchDataCF = await _fetchDataCF(codeforces);
        const fetchDataGitHub = await _fetchDataGitHub(github);
        const getUnipileProfile = await _getUnipileProfile(linkedin);

        const aggregatedData = {
            fetchDataLC,
            fetchDataCC,
            fetchDataCF,
            fetchDataGitHub,
            getUnipileProfile,
        };

        const analysis = await getAnalysis(JSON.stringify(aggregatedData));
        return res.json({ success: true, analysis });

    } catch (error) {
        console.error("Error analyzing data:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});


export default router;