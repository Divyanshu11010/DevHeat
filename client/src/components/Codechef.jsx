import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CodeChefStatsDisplay = ({ data }) => {
  const {
    currentRating,
    highestRating,
    globalRank,
    countryRank,
    stars,
    heatMap,
    ratingData,
  } = data;

  const ratingProgress = ((currentRating / 3000) * 100).toFixed(2);
  const highestRatingProgress = ((highestRating / 3000) * 100).toFixed(2);

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
              pathColor: "#1E7D22",
              textColor: "#1E7D22",
            })}
          />
        </div>
        <p className="mt-2 text-sm">Stars: {stars}</p>
      </div>

      {/* Highest Rating */}
      <div className="shadow rounded p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Highest Rating</h2>
        <div className="w-24 h-24">
          <CircularProgressbar
            value={highestRatingProgress}
            text={`${highestRating}`}
            styles={buildStyles({
              pathColor: "#f59e0b",
              textColor: "#f59e0b",
            })}
          />
        </div>
      </div>

      {/* Rank Info */}
      <div className="shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Rank Info</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Global Rank</p>
            <div className="w-full h-3 bg-gray-200 rounded">
              <div
                className="h-3 bg-green-600 rounded"
                style={{ width: `${(1 - globalRank / 40000) * 100}%` }}
              />
            </div>
            <p className="text-sm mt-1">#{globalRank}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Country Rank</p>
            <div className="w-full h-3 bg-gray-200 rounded">
              <div
                className="h-3 bg-blue-500 rounded"
                style={{ width: `${(1 - countryRank / 30000) * 100}%` }}
              />
            </div>
            <p className="text-sm mt-1">#{countryRank}</p>
          </div>
        </div>
      </div>

      {/* Contest Table */}
      <div className="shadow rounded p-6 col-span-1 md:col-span-2 xl:col-span-3">
        <h2 className="text-xl font-semibold mb-4">Recent Contests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Date</th>
                <th className="p-2">Contest</th>
                <th className="p-2">Rank</th>
                <th className="p-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {ratingData.slice(-10).reverse().map((contest) => (
                <tr key={contest.code} className="border-b hover:bg-gray-800">
                  <td className="p-2">{`${contest.getday}-${contest.getmonth}-${contest.getyear}`}</td>
                  <td className="p-2">{contest.name}</td>
                  <td className="p-2">#{contest.rank}</td>
                  <td className="p-2">{contest.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Heatmap */}
      <div className="shadow rounded p-6 col-span-1 md:col-span-2 xl:col-span-3">
        <h2 className="text-xl font-semibold mb-4">Activity Highlights</h2>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1">
          {heatMap.slice(-60).map((day, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded ${day.value > 30
                ? "bg-green-700"
                : day.value > 15
                  ? "bg-green-500"
                  : day.value > 5
                    ? "bg-green-300"
                    : "bg-gray-200"
                }`}
              title={`${day.date}: ${day.value}`}
            ></div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Color represents activity level</p>
      </div>
    </div>
  );
};

export default CodeChefStatsDisplay;
