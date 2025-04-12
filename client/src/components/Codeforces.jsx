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
    <div className="w-full p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Current Rating */}
      <div className="rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-blue-600">Current Rating</h2>
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
        <p className="mt-3 text-sm text-gray-600">Rank: <span className="capitalize font-medium">{rank}</span></p>
      </div>

      {/* Max Rating */}
      <div className="rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-yellow-600">Max Rating</h2>
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
        <p className="mt-3 text-sm text-gray-600">Max Rank: <span className="capitalize font-medium">{maxRank}</span></p>
      </div>

      {/* Profile Stats */}
      <div className="rounded-2xl shadow-md p-6 text-center transition hover:shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-purple-600">Profile Stats</h2>
        <p className="text-sm text-gray-700 mb-2">Contribution: <span className="font-medium">{contribution}</span></p>
        <p className="text-sm text-gray-700">Friend Count: <span className="font-medium">{friendOfCount}</span></p>
      </div>

      {/* Solved Count */}
      <div className="rounded-2xl shadow-md p-6 text-center transition hover:shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-green-600">Solved Questions</h2>
        <p className="text-4xl font-bold text-green-700">{solvedCount}</p>
        <p className="text-sm text-gray-500 mt-1">across rated problems</p>
      </div>

      {/* Tag Frequency */}
      <div className="rounded-2xl shadow-md p-6 sm:col-span-2 xl:col-span-3 transition hover:shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-center text-indigo-600">Top Tags</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
          {sortedTags.map(([tag, count]) => (
            <div
              key={tag}
              className="flex items-center justify-between px-4 py-2 bg-indigo-50 rounded-lg"
            >
              <span className="capitalize text-gray-700">{tag}</span>
              <span className="font-semibold text-indigo-600">{count}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Based on {solvedCount} solved problems
        </p>
      </div>
    </div>
  );
};

export default CodeforcesStatsDisplay;