import _fetchDataLC from "../utilities/leetcode.js"
import _fetchDataCC from "../utilities/codechef.js"
import _fetchDataCF from "../utilities/codeforces.js"
import _fetchDataGitHub from "../utilities/github.js"
import _getUnipileProfile from "../utilities/linkedin.js"
import getAnalysis from "../utilities/gemini.js"

import { Router } from "express";
const router = new Router;

router.post("/analyze", async (req, res) => {
    try {
        const data = req.body;

        const fetchDataLC = await _fetchDataLC(data.leetcode);
        const fetchDataCC = await _fetchDataCC(data.codechef);
        const fetchDataCF = await _fetchDataCF(data.codeforces);
        const fetchDataGitHub = await _fetchDataGitHub(data.github);
        const getUnipileProfile = await _getUnipileProfile(data.linkedin);

        const aggregatedData = {
            leetcode: fetchDataLC,
            codechef: fetchDataCC,
            codeforces: fetchDataCF,
            github: fetchDataGitHub,
            linkedin: getUnipileProfile
        };

        const _analysis = await getAnalysis(JSON.stringify(aggregatedData));
        const analysis = JSON.parse(_analysis)
        return res.json({ success: true, analysis, aggregatedData });

    } catch (error) {
        console.error("Error analyzing data:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

export default router;