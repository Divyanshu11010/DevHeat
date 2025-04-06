import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from "../components/Loader.jsx";
import logo from "../assets/logo.png"

const backendURL = import.meta.env.VITE_BACKEND_URL;

function Home() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const data = {
            leetcode: form.leetcode.value.trim(),
            codechef: form.codechef.value.trim(),
            codeforces: form.codeforces.value.trim(),
            github: form.github.value.trim(),
            linkedin: form.linkedin.value.trim(),
        };

        try {
            const response = await fetch(`${backendURL}/api/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            const output = result.analysis;
            console.log(result)
            
            /// Navigate to response page with data
            navigate('/response', { state: { output } });
        } catch (error) {
            console.error('Error:', error);
            alert("Something went wrong while analyzing. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
            {loading && <Loader />}

            <header className="flex items-center justify-between px-6 shadow bg-white dark:bg-gray-800">
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-20 w-20 rounded-full"
                    />
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ProfileAnalyzer
                    </span>
                </Link>
                <span className="text-xl text-gray-600 dark:text-gray-400 hidden sm:block">
                    Elevate your digital presence 🚀
                </span>
            </header>

            <main className="flex flex-col items-center justify-center px-4 py-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    Analyze Tech Profiles Instantly
                </h1>
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="w-full sm:max-w-sm md:max-w-md p-6 sm:p-6 md:p-8 bg-gray-800 rounded-2xl shadow-md space-y-5"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">
                        Enter Usernames
                    </h2>

                    <input
                        type="text"
                        name="leetcode"
                        placeholder="Leetcode Username"
                        className="input-field focus:ring-blue-500"
                        autoComplete="on"
                    />
                    <input
                        type="text"
                        name="codechef"
                        placeholder="Codechef Username"
                        className="input-field focus:ring-purple-500"
                        autoComplete="on"
                    />
                    <input
                        type="text"
                        name="codeforces"
                        placeholder="Codeforces Username"
                        className="input-field focus:ring-pink-500"
                        autoComplete="on"
                    />
                    <input
                        type="text"
                        name="github"
                        placeholder="Github Username"
                        className="input-field focus:ring-cyan-500"
                        autoComplete="on"
                    />
                    <input
                        type="text"
                        name="linkedin"
                        placeholder="Linkedin Username"
                        className="input-field focus:ring-blue-500"
                        autoComplete="on"
                    />

                    <button
                        type="submit"
                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-2 rounded-lg transition duration-200"
                    >
                        Analyze
                    </button>
                </form>
            </main>
        </div>
    );
}

export default Home;
