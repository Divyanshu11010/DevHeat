import React from "react";

const LinkedInStatsDisplay = ({ data }) => {
  const { posts, summary } = data;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
      {/* Summary Stats */}
      <div className="shadow rounded p-6 flex flex-col justify-center">
        <h2 className="text-xl font-semibold mb-4 text-center">LinkedIn Summary</h2>
        <div className="space-y-2 text-sm">
          <p>Total Posts: {summary.total_posts}</p>
          <p>Original Posts: {summary.original_posts}</p>
          <p>Reposts: {summary.reposts}</p>
          <p>Total Reactions: {summary.total_reactions}</p>
          <p>Total Comments: {summary.total_comments}</p>
          <p>Total Reposts (of posts): {summary.total_reposts}</p>
        </div>
      </div>

      {/* Engagement Averages */}
      <div className="shadow rounded p-6 flex flex-col justify-center">
        <h2 className="text-xl font-semibold mb-4 text-center">Engagement Stats</h2>
        <div className="space-y-2 text-sm">
          <p>Avg Reactions/Post: {summary.average_engagement_per_post.reactions}</p>
          <p>Avg Comments/Post: {summary.average_engagement_per_post.comments}</p>
          <p>Avg Reposts/Post: {summary.average_engagement_per_post.reposts}</p>
        </div>
      </div>

      {/* Post Frequency */}
      <div className="shadow rounded p-6 flex flex-col justify-center">
        <h2 className="text-xl font-semibold mb-4 text-center">Posting Frequency</h2>
        <div className="space-y-2 text-sm">
          <p>First Post Date: {summary.post_frequency.first_post_date}</p>
          <p>Last Post Date: {summary.post_frequency.last_post_date}</p>
          <p>Days Active: {summary.post_frequency.days_active}</p>
          <p>Posts/Day: {summary.post_frequency.posts_per_day.toFixed(2)}</p>
          <p>Posts/Week: {summary.post_frequency.posts_per_week.toFixed(2)}</p>
        </div>
      </div>

      {/* Recent Posts Table */}
      <div className="shadow rounded p-6 col-span-1 md:col-span-2 xl:col-span-3">
        <h2 className="text-xl font-semibold mb-4">Recent LinkedIn Posts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Date</th>
                <th className="p-2">Author</th>
                <th className="p-2">Repost?</th>
                <th className="p-2">Reactions</th>
                <th className="p-2">Comments</th>
                <th className="p-2">Reposts</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.post_id} className="border-b hover:bg-gray-800">
                  <td className="p-2">{post.date}</td>
                  <td className="p-2">{post.author}</td>
                  <td className="p-2">
                    {post.is_repost ? `Yes (by ${post.reposted_by})` : "No"}
                  </td>
                  <td className="p-2">{post.reactions}</td>
                  <td className="p-2">{post.comments}</td>
                  <td className="p-2">{post.reposts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engagement Visualization */}
      <div className="shadow rounded p-6 col-span-1 md:col-span-2 xl:col-span-3">
        <h2 className="text-xl font-semibold mb-4">Engagement Highlights</h2>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1">
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
                className={`w-4 h-4 rounded ${color}`}
                title={`${post.date}: ${total} interactions`}
              ></div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2">Color represents total engagement per post</p>
      </div>
    </div>
  );
};

export default LinkedInStatsDisplay;
