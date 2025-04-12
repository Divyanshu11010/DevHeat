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
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6">

      {/* Contest Rating */}
      <div className=" shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
        <h2 className="text-lg font-semibold mb-4">Contest Rating</h2>
        <div className="w-24 h-24">
          <CircularProgressbar
            value={contestRatingProgress}
            text={`${contest.contestRating.toFixed(0)}`}
            styles={buildStyles({
              pathColor: "#1E7D22",
              textColor: "#1E7D22",
              trailColor: "#d1fae5",
            })}
          />
        </div>
      </div>

      {/* Contest Top Percentage */}
      <div className=" shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
        <h2 className="text-lg font-semibold mb-4">Top Percentage</h2>
        <div className="w-24 h-24">
          <CircularProgressbar
            value={contestTopPercentageProgress}
            text={`${contestTopPercentageProgress.toFixed(2)}%`}
            styles={buildStyles({
              pathColor: "#f59e0b",
              textColor: "#f59e0b",
              trailColor: "#fef3c7",
            })}
          />
        </div>
      </div>

      {/* Contest Participation */}
      <div className=" shadow-md rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4 text-center">Contest Participation</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div>
            <p className="font-medium">Contests Attended</p>
            <p>{contest.contestAttend}</p>
          </div>
          <div>
            <p className="font-medium">Global Rank</p>
            <p>#{contest.contestGlobalRanking}</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className=" shadow-md rounded-2xl p-6 col-span-1 sm:col-span-2 lg:col-span-3">
        <h2 className="text-lg font-semibold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-4">
          {badges.badges.map((badge, index) => (
            <div
              key={index}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <img src={badge.icon} alt={badge.displayName} className="w-8 h-8" />
              <span className="text-sm">{badge.displayName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Used Languages */}
      <div className=" shadow-md rounded-2xl p-6 col-span-1 sm:col-span-2 lg:col-span-3">
        <h2 className="text-lg font-semibold mb-4">Used Languages</h2>
        <div className="flex flex-wrap gap-3">
          {lang.matchedUser.languageProblemCount.map((langItem, index) => (
            <div
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-xl text-sm"
            >
              {langItem.languageName} — {langItem.problemsSolved} problems
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className=" shadow-md rounded-2xl p-6 col-span-1 sm:col-span-2 lg:col-span-3">
        <h2 className="text-lg font-semibold mb-4">Skills</h2>
        <div className="space-y-4 text-sm">
          {Object.keys(skills.data.matchedUser.tagProblemCounts).map((level, index) => (
            <div key={index}>
              <p className="font-medium mb-1">
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {skills.data.matchedUser.tagProblemCounts[level].map((skill, skillIndex) => (
                  <li key={skillIndex}>
                    {skill.tagName} — {skill.problemsSolved} problems
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Solved Problems */}
      <div className=" shadow-md rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4 text-center">Solved Problems</h2>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium">Total Solved</p>
            <p>{solvedProblem.solvedProblem}</p>
          </div>
          <div>
            <p className="font-medium">Easy</p>
            <p>{solvedProblem.easySolved}</p>
          </div>
          <div>
            <p className="font-medium">Medium</p>
            <p>{solvedProblem.mediumSolved}</p>
          </div>
          <div>
            <p className="font-medium">Hard</p>
            <p>{solvedProblem.hardSolved}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeStatsDisplay;