import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { marked } from 'marked';

function Response() {
    const [htmlContent, setHtmlContent] = useState('');
    const location = useLocation();
    const markdownText = location.state?.output || '';
    
    useEffect(() => {
        if (typeof markdownText === 'string') {
            setHtmlContent(marked.parse(markdownText));
        } else {
            console.warn("Invalid markdownText:", markdownText);
        }
    }, [markdownText]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center px-4 py-8">
            {/* Navigation Button - Centered */}
            <div className="w-full flex justify-center mb-6">
                <Link
                    to="/analyze"
                    className="text-lg font-semibold bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg shadow transition"
                >
                    ← Back to Analyze
                </Link>
            </div>

            {/* Parsed Markdown Content */}
            <main className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <section id="response-content">
                    <div
                        className="prose max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </section>
            </main>
        </div>
    );
}

export default Response;
