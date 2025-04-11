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
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
      {/* Public Repositories */}
      <div className="shadow rounded p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Public Repositories</h2>
        <p className="text-4xl font-bold text-green-600">{publicRepos}</p>
      </div>

      {/* Followers */}
      <div className="shadow rounded p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Followers</h2>
        <p className="text-4xl font-bold text-blue-500">{followers}</p>
      </div>

      {/* Pull Requests */}
      <div className="shadow rounded p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Total PRs</h2>
        <p className="text-4xl font-bold text-yellow-500">{totalPRs}</p>
      </div>

      {/* Yearly Contributions */}
      <div className="shadow rounded p-6 col-span-1 md:col-span-2 xl:col-span-3">
        <h2 className="text-xl font-semibold mb-4">Yearly Contributions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {Object.entries(yearlyContributions).map(([year, data]) => (
            <div
              key={year}
              className="bg-gray-800 p-4 rounded shadow-sm flex flex-col"
            >
              <p className="text-lg font-semibold">{year}</p>
              <p className="text-sm mt-1 text-gray-600">
                {data.totalContributions} contributions
              </p>
              <p className="text-sm text-gray-500">
                {data.activeDays} active days
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Total: {totalContributions} contributions
        </p>
      </div>

      {/* Tech Stacks */}
      <div className="shadow rounded p-6 col-span-1 md:col-span-2 xl:col-span-3">
        <h2 className="text-xl font-semibold mb-4">Top Tech Stacks</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-sm">
          {topStacks.map(([tech, count]) => (
            <div
              key={tech}
              className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded"
            >
              <span className="font-medium">{tech}</span>
              <span className="text-green-400 font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popularity */}
      <div className="shadow rounded p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">GitHub Popularity</h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Stars:</span>{" "}
            {popularity.stars}
          </p>
          <p>
            <span className="font-medium">Forks:</span>{" "}
            {popularity.forks}
          </p>
          <p>
            <span className="font-medium">Watchers:</span>{" "}
            {popularity.watchers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GitHubStatsDisplay;
