import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Overview from '../components/Overview';
import Leetcode from '../components/Leetcode';
import Codechef from '../components/Codechef';
import Codeforces from '../components/Codeforces.jsx';
import Github from '../components/Github';
import Linkedin from '../components/Linkedin';
import BadRequest from '../components/BadRequest.jsx';
import { useLocation } from 'react-router-dom';

function Response() {
    const [selectedTab, setSelectedTab] = useState('leetcode');

    const location = useLocation();
    const analysis = location.state?.output || '';
    const dashboardData = location.state?.aggregatedData || '';

    const handleNavSelect = (tab) => {
        setSelectedTab(tab);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'leetcode':
                return dashboardData.leetcode ? (
                    <Leetcode data={dashboardData.leetcode} />
                ) : (
                    <BadRequest />
                );
            case 'codechef':
                return dashboardData.codechef ? (
                    <Codechef data={dashboardData.codechef} />
                ) : (
                    <BadRequest />
                );
            case 'codeforces':
                return dashboardData.codeforces ? (
                    <Codeforces data={dashboardData.codeforces} />
                ) : (
                    <BadRequest />
                );
            case 'github':
                return dashboardData.github ? (
                    <Github data={dashboardData.github} />
                ) : (
                    <BadRequest />
                );
            case 'linkedin':
                return dashboardData.linkedin ? (
                    <Linkedin data={dashboardData.linkedin} />
                ) : (
                    <BadRequest />
                );
            case 'overview':
                return analysis ? <Overview data={analysis} /> : <BadRequest />;
            default:
                return analysis ? <Overview data={analysis} /> : <BadRequest />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
            <Navbar onNavSelect={handleNavSelect} />
            <div className="flex-grow flex flex-col items-center px-4 py-8">
                {renderContent()}
            </div>
        </div>
    );
}

export default Response;