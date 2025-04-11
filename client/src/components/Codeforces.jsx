import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CodeforcesStatsDisplay = ({ data }) => {
  const user = data.info.result[0];
  const solved = data.solved;

  const currentRating = user.rating || 0;
  const maxRating = user.maxRating || 0;
  const contribution = user.contribution;
  const rank = user.rank;
  const maxRank = user.maxRank;
  const friendOfCount = user.friendOfCount;

  const ratingProgress = ((currentRating / 3500) * 100).toFixed(2);
  const maxRatingProgress = ((maxRating / 3500) * 100).toFixed(2);

  const solvedCount = solved.length;

  const tagFrequency = {};
  solved.forEach((q) => {
    q.tags.forEach((tag) => {
      tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12); // Top 12 tags

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
      {/* Current Rating */}
      <div className="shadow rounded p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Current Rating</h2>
        <div className="w-24 h-24">
          <CircularProgressbar
            value={ratingProgress}
            text={`${currentRating}`}
            styles={buildStyles({
              pathColor: "#2563eb",
              textColor: "#2563eb",
            })}
          />
        </div>
        <p className="mt-2 text-sm capitalize">Rank: {rank}</p>
      </div>

      {/* Max Rating */}
      <div className="shadow rounded p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Max Rating</h2>
        <div className="w-24 h-24">
          <CircularProgressbar
            value={maxRatingProgress}
            text={`${maxRating}`}
            styles={buildStyles({
              pathColor: "#f59e0b",
              textColor: "#f59e0b",
            })}
          />
        </div>
        <p className="mt-2 text-sm capitalize">Max Rank: {maxRank}</p>
      </div>

      {/* Contribution & Friends */}
      <div className="shadow rounded p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Profile Stats</h2>
        <p className="text-sm mb-2">Contribution: {contribution}</p>
        <p className="text-sm">Friend Count: {friendOfCount}</p>
      </div>

      {/* Solved Count */}
      <div className="shadow rounded p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Solved Questions</h2>
        <p className="text-3xl font-bold text-green-600">{solvedCount}</p>
        <p className="text-sm text-gray-500 mt-1">across rated problems</p>
      </div>

      {/* Tag Frequency */}
      <div className="shadow rounded p-6 md:col-span-2 xl:col-span-3">
        <h2 className="text-xl font-semibold mb-4 text-center">Top Tags</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
          {sortedTags.map(([tag, count]) => (
            <div
              key={tag}
              className="flex items-center justify-between px-3 py-2 rounded"
            >
              <span className="capitalize">{tag}</span>
              <span className="font-medium text-blue-600">{count}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Based on {solvedCount} solved problems
        </p>
      </div>
    </div>
  );
};

export default CodeforcesStatsDisplay;
