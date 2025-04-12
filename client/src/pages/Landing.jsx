import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center px-6">
            <div className="max-w-3xl text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white animate-fadeInUp">
                    Unlock Your Tech Potential
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 animate-fadeInUp delay-200">
                    Get a recruiter-ready score, personalized insights, and profile comparisons across platforms like GitHub, LeetCode, LinkedIn, and more — all in one place.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-400">
                    <Link
                        to="/analyze"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                        Try Analyzer
                    </Link>
                </div>
            </div>

            {/* Feature Section */}
            <div className="mt-20 max-w-4xl grid md:grid-cols-2 gap-8 text-left animate-fadeInUp delay-600">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Profile Scoring</h3>
                    <p className="text-gray-700 dark:text-gray-300">Evaluate GitHub, LinkedIn, and coding site activity with a unified Recruiter Readiness Score.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-2">Insight Generation</h3>
                    <p className="text-gray-700 dark:text-gray-300">Discover strengths and weaknesses across your digital presence with actionable suggestions.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-2">Peer Comparison</h3>
                    <p className="text-gray-700 dark:text-gray-300">Benchmark yourself against top developers and peers in your domain.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">Career Suggestions</h3>
                    <p className="text-gray-700 dark:text-gray-300">Receive personalized career roadmap suggestions based on real trends.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">Recruiter Readiness Score</h3>
                    <p className="text-gray-700 dark:text-gray-300">Get an overall score indicating your preparedness for recruiter outreach, based on various digital platforms.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">Dashboard of Different Platforms</h3>
                    <p className="text-gray-700 dark:text-gray-300">View a comprehensive dashboard that consolidates data from GitHub, LinkedIn, and other coding platforms.</p>
                </div>
            </div>
        </div>
    );
}

export default Landing;
