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
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 xl:p-8">
      
      {/* Current Rating */}
      <div className="shadow-md rounded-2xl p-6 flex flex-col items-center bg-white dark:bg-gray-900">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Current Rating</h2>
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
          <CircularProgressbar
            value={ratingProgress}
            text={`${currentRating}`}
            styles={buildStyles({
              pathColor: "#1E7D22",
              textColor: "#1E7D22",
            })}
          />
        </div>
        <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">Stars: {stars}</p>
      </div>

      {/* Highest Rating */}
      <div className="shadow-md rounded-2xl p-6 flex flex-col items-center bg-white dark:bg-gray-900">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Highest Rating</h2>
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
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
      <div className="shadow-md rounded-2xl p-6 bg-white dark:bg-gray-900">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">Rank Info</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Global Rank</p>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded">
              <div
                className="h-3 bg-green-600 rounded"
                style={{ width: `${(1 - globalRank / 40000) * 100}%` }}
              />
            </div>
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">#{globalRank}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Country Rank</p>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded">
              <div
                className="h-3 bg-blue-500 rounded"
                style={{ width: `${(1 - countryRank / 30000) * 100}%` }}
              />
            </div>
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">#{countryRank}</p>
          </div>
        </div>
      </div>

      {/* Contest Table */}
      <div className="shadow-md rounded-2xl p-6 col-span-1 sm:col-span-2 lg:col-span-3 bg-white dark:bg-gray-900">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Contests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Contest</th>
                <th className="p-2">Rank</th>
                <th className="p-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {ratingData.slice(-10).reverse().map((contest) => (
                <tr key={contest.code} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
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
      <div className="shadow-md rounded-2xl p-6 col-span-1 sm:col-span-2 lg:col-span-3 bg-white dark:bg-gray-900">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Activity Highlights</h2>
        <div className="grid grid-cols-12 gap-1 sm:gap-1.5 md:gap-2">
          {heatMap.slice(-60).map((day, i) => (
            <div
              key={i}
              className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded ${day.value > 30
                ? "bg-green-700"
                : day.value > 15
                ? "bg-green-500"
                : day.value > 5
                ? "bg-green-300"
                : "bg-gray-200 dark:bg-gray-700"
              }`}
              title={`${day.date}: ${day.value}`}
            ></div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Color represents activity level</p>
      </div>
    </div>
  );
};

export default CodeChefStatsDisplay;