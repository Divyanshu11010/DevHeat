import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const LeetCodeStatsDisplay = ({ data }) => {
  const {
    solvedProblem,
    skills,
    badges,
    contest,
    lang,
  } = data;

  const contestRatingProgress = ((contest.contestRating / 3000) * 100).toFixed(2);
  const contestTopPercentageProgress = contest.contestTopPercentage;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
      {/* Contest Rating */}
      <div className="shadow rounded p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Contest Rating</h2>
        <div className="w-24 h-24">
          <CircularProgressbar
            value={contestRatingProgress}
            text={`${contest.contestRating.toFixed(0)}`}
            styles={buildStyles({
              pathColor: "#1E7D22",
              textColor: "#1E7D22",
            })}
          />
        </div>
      </div>

      {/* Contest Top Percentage */}
      <div className="shadow rounded p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Contest Top Percentage</h2>
        <div className="w-24 h-24">
          <CircularProgressbar
            value={contestTopPercentageProgress}
            text={`${contestTopPercentageProgress.toFixed(2)}%`}
            styles={buildStyles({
              pathColor: "#f59e0b",
              textColor: "#f59e0b",
            })}
          />
        </div>
      </div>

      {/* Contest Participation */}
      <div className="shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Contest Participation</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Total Contests Attended</p>
            <p className="text-sm">{contest.contestAttend}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Contest Global Rank</p>
            <p className="text-sm">#{contest.contestGlobalRanking}</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="shadow rounded p-6 col-span-1 md:col-span-2 xl:col-span-3">
        <h2 className="text-xl font-semibold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-4">
          {badges.badges.map((badge, index) => (
            <div
              key={index}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center gap-2"
            >
              <img src={badge.icon} alt={badge.displayName} className="w-8 h-8" />
              <span>{badge.displayName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Used Languages */}
      <div className="shadow rounded p-6 col-span-1 md:col-span-2 xl:col-span-3">
        <h2 className="text-xl font-semibold mb-4">Used Languages</h2>
        <div className="flex flex-wrap gap-4">
          {lang.matchedUser.languageProblemCount.map((langItem, index) => (
            <div
              key={index}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm"
            >
              {langItem.languageName} — {langItem.problemsSolved} problems
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="shadow rounded p-6 col-span-1 md:col-span-2 xl:col-span-3">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="space-y-4">
          {Object.keys(skills.data.matchedUser.tagProblemCounts).map((level, index) => (
            <div key={index}>
              <p className="text-sm font-medium">{level.charAt(0).toUpperCase() + level.slice(1)}</p>
              <ul className="list-disc pl-5">
                {skills.data.matchedUser.tagProblemCounts[level].map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-sm">
                    {skill.tagName} — {skill.problemsSolved} problems
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Solved Problems */}
      <div className="shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Solved Problems</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Total Solved Problems</p>
            <p className="text-sm">{solvedProblem.solvedProblem}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Easy Solved</p>
            <p className="text-sm">{solvedProblem.easySolved}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Medium Solved</p>
            <p className="text-sm">{solvedProblem.mediumSolved}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Hard Solved</p>
            <p className="text-sm">{solvedProblem.hardSolved}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeStatsDisplay;
