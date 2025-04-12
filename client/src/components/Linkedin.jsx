import React from "react";

const LinkedInStatsDisplay = ({ data }) => {
  const { posts, summary } = data;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Summary Stats */}
        <div className="bg-gray-700 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
            LinkedIn Summary
          </h2>
          <div className="space-y-2 text-gray-700 text-sm">
            <p><span className="font-medium">Total Posts:</span> {summary.total_posts}</p>
            <p><span className="font-medium">Original Posts:</span> {summary.original_posts}</p>
            <p><span className="font-medium">Reposts:</span> {summary.reposts}</p>
            <p><span className="font-medium">Total Reactions:</span> {summary.total_reactions}</p>
            <p><span className="font-medium">Total Comments:</span> {summary.total_comments}</p>
            <p><span className="font-medium">Total Reposts (of posts):</span> {summary.total_reposts}</p>
          </div>
        </div>

        {/* Engagement Averages */}
        <div className="bg-gray-700 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">
            Engagement Stats
          </h2>
          <div className="space-y-2 text-gray-700 text-sm">
            <p><span className="font-medium">Avg Reactions/Post:</span> {summary.average_engagement_per_post.reactions}</p>
            <p><span className="font-medium">Avg Comments/Post:</span> {summary.average_engagement_per_post.comments}</p>
            <p><span className="font-medium">Avg Reposts/Post:</span> {summary.average_engagement_per_post.reposts}</p>
          </div>
        </div>

        {/* Post Frequency */}
        <div className="bg-gray-700 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
            Posting Frequency
          </h2>
          <div className="space-y-2 text-gray-700 text-sm">
            <p><span className="font-medium">First Post Date:</span> {summary.post_frequency.first_post_date}</p>
            <p><span className="font-medium">Last Post Date:</span> {summary.post_frequency.last_post_date}</p>
            <p><span className="font-medium">Days Active:</span> {summary.post_frequency.days_active}</p>
            <p>
              <span className="font-medium">Posts/Day:</span>{" "}
              {summary.post_frequency.posts_per_day.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Posts/Week:</span>{" "}
              {summary.post_frequency.posts_per_week.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Posts Table */}
      <div className="bg-gray-700 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
          Recent LinkedIn Posts
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-3 font-medium text-gray-600">Date</th>
                <th className="p-3 font-medium text-gray-600">Author</th>
                <th className="p-3 font-medium text-gray-600">Repost?</th>
                <th className="p-3 font-medium text-gray-600">Reactions</th>
                <th className="p-3 font-medium text-gray-600">Comments</th>
                <th className="p-3 font-medium text-gray-600">Reposts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.post_id} className="hover:bg-gray-600">
                  <td className="p-3">{post.date}</td>
                  <td className="p-3">{post.author}</td>
                  <td className="p-3">
                    {post.is_repost ? `Yes (by ${post.reposted_by})` : "No"}
                  </td>
                  <td className="p-3">{post.reactions}</td>
                  <td className="p-3">{post.comments}</td>
                  <td className="p-3">{post.reposts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engagement Visualization */}
      <div className="bg-gray-700 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
          Engagement Highlights
        </h2>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {posts.map((post, i) => {
            const total = post.reactions + post.comments + post.reposts;
            const color =
              total > 80
                ? "bg-green-700"
                : total > 40
                  ? "bg-green-500"
                  : total > 10
                    ? "bg-green-300"
                    : "bg-gray-200";
            return (
              <div
                key={i}
                className={`w-4 h-4 rounded ${color} transition-all duration-300`}
                title={`${post.date}: ${total} interactions`}
              ></div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Color represents total engagement per post
        </p>
      </div>
    </div>
  );
};

export default LinkedInStatsDisplay;
