import fetchDataLC from "./utilities/leetcode.js";
import fetchDataCC from "./utilities/codechef.js";
import fetchDataCF from "./utilities/codeforces.js";
import fetchDataGitHub from "./utilities/github.js";
import getUnipileProfile from "./utilities/linkedin.js";

const res = await getUnipileProfile("divyanshu-vishwakarma");
console.dir(res, {depth : null});