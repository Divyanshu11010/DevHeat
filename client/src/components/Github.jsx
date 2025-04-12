import React from "react";

const GitHubStatsDisplay = ({ data }) => {
  const {
    publicRepos,
    yearlyContributions,
    followers,
    techStacks,
    popularity,
    totalPRs,
  } = data;

  const totalContributions = Object.values(yearlyContributions).reduce(
    (sum, year) => sum + year.totalContributions,
    0
  );

  const topStacks = Object.entries(techStacks)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 xl:p-8">
      {/* Card component */}
      {[
        {
          label: "Public Repositories",
          value: publicRepos,
          color: "text-green-500",
        },
        {
          label: "Followers",
          value: followers,
          color: "text-blue-500",
        },
        {
          label: "Total PRs",
          value: totalPRs,
          color: "text-yellow-500",
        },
      ].map(({ label, value, color }) => (
        <div
          key={label}
          className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 flex flex-col items-center text-center"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {label}
          </h2>
          <p className={`text-4xl font-bold ${color}`}>{value}</p>
        </div>
      ))}

      {/* Yearly Contributions */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 col-span-1 sm:col-span-2 lg:col-span-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
          Yearly Contributions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {Object.entries(yearlyContributions).map(([year, data]) => (
            <div
              key={year}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center"
            >
              <p className="text-lg font-semibold text-gray-700 dark:text-white">
                {year}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {data.totalContributions} contributions
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {data.activeDays} active days
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Total: {totalContributions} contributions
        </p>
      </div>

      {/* Top Tech Stacks */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 col-span-1 sm:col-span-2 lg:col-span-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
          Top Tech Stacks
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 text-sm">
          {topStacks.map(([tech, count]) => (
            <div
              key={tech}
              className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl flex justify-between items-center"
            >
              <span className="font-medium text-gray-800 dark:text-white">
                {tech}
              </span>
              <span className="font-semibold text-green-600">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popularity */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 col-span-1 sm:col-span-2 lg:col-span-1 text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          GitHub Popularity
        </h2>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-medium">Stars:</span> {popularity.stars}
          </p>
          <p>
            <span className="font-medium">Forks:</span> {popularity.forks}
          </p>
          <p>
            <span className="font-medium">Watchers:</span> {popularity.watchers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GitHubStatsDisplay;
