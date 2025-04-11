import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Overview from '../components/Overview';
import Leetcode from '../components/Leetcode';
import Codechef from '../components/Codechef';
import Codeforces from '../components/Codeforces.jsx';
import Github from '../components/Github';
import Linkedin from '../components/Linkedin';
import { useLocation } from 'react-router-dom';

function Response() {
    const [selectedTab, setSelectedTab] = useState('overview');

    const location = useLocation();
    const analysis = location.state?.output || '';
    const dashboardData = location.state?.aggregatedData || '';

    const handleNavSelect = (tab) => {
        setSelectedTab(tab);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'leetcode':
                return <Leetcode data={dashboardData.leetcode} />;
            case 'codechef':
                return <Codechef data={dashboardData.codechef} />;
            case 'codeforces':
                return <Codeforces data={dashboardData.codeforces} />;
            case 'github':
                return <Github data={dashboardData.github} />;
            case 'linkedin':
                return <Linkedin data={dashboardData.linkedin} />;
            case 'overview':
            default:
                return <Overview data={analysis} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col">
            <Navbar onNavSelect={handleNavSelect} />
            <div className="flex-grow flex flex-col items-center px-4 py-8">
                {renderContent()}
            </div>
        </div>
    );
}

export default Response;
