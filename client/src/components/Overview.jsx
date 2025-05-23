import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Card({ title, children }) {
  return (
    <div className="bg-gray-800 shadow-md rounded-2xl p-5 md:p-6 transition-all hover:shadow-lg">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

function Overview({ data }) {
  const analysis = data;
  const peerComparisonData = {
    labels: Object.keys(analysis.Peer_Comparison),
    datasets: [
      {
        label: 'Peer Comparison Scores',
        data: Object.values(analysis.Peer_Comparison),
        backgroundColor: [
          'rgba(239, 68, 68, 0.6)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(234, 179, 8, 0.6)',
          'rgba(16, 185, 129, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#d1d1d1' },
      },
      title: {
        display: true,
        text: '',
        color: '#d1d1d1',
      },
    },
    scales: {
      x: { ticks: { color: '#d1d1d1' } },
      y: { ticks: { color: '#d1d1d1' } },
    },
  };

  return (
    <div className="min-h-screen bg-[#121A2A] px-4 sm:px-6 lg:px-12 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-white">
        Candidate Analysis Overview
      </h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        {/* Profile Scoring */}
        <Card title="Profile Scoring">
          <div className="flex flex-col items-center">
            <div className="w-28 sm:w-32 h-28 sm:h-32 mb-4">
              <CircularProgressbar
                value={analysis.Profile_Scoring.score}
                maxValue={100}
                text={`${analysis.Profile_Scoring.score}%`}
                styles={buildStyles({
                  textColor: '#d1d1d1',
                  pathColor: '#10B981',
                  trailColor: '#374151',
                })}
              />
            </div>
            <div className="w-full">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Skills</h3>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.Profile_Scoring.skills.map((skill, index) => (
                  <li key={index} className="text-gray-300 text-sm sm:text-base">{skill}</li>
                ))}
              </ul>
              <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2 text-white">Strengths</h3>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.Profile_Scoring.strengths.map((strength, index) => (
                  <li key={index} className="text-gray-300 text-sm sm:text-base">{strength}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Recruiter Readiness Score */}
        <Card title="Recruiter Readiness Score">
          <div className="flex flex-col items-center justify-center">
            <div className="w-44 h-44 mb-4">
              <CircularProgressbar
                value={analysis.Recruiter_Readiness_Score.score}
                maxValue={100}
                text={`${analysis.Recruiter_Readiness_Score.score}%`}
                styles={buildStyles({
                  textColor: '#d1d1d1',
                  pathColor: '#10B981',
                  trailColor: '#374151',
                })}
              />
            </div>
            <p className="text-lg text-gray-300">
              <strong>Score: </strong> {analysis.Recruiter_Readiness_Score.score}
            </p>
          </div>
        </Card>

        {/* Insight Generation */}
        <Card title="Insight Generation">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{analysis.Insight_Generation}</p>
        </Card>

        {/* Personalized Career Pathway Suggestions */}
        <Card title="Personalized Career Pathway Suggestions">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{analysis.Personalized_Career_Suggestions}</p>
        </Card>

        {/* Peer Comparison */}
        <Card title="Peer Comparison">
          <div className="w-full h-64 sm:h-72 mb-6">
            <Bar
              data={peerComparisonData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: 'Peer Comparison',
                  },
                },
              }}
            />
          </div>
          <ul className="list-disc pl-5 space-y-1">
            {Object.entries(analysis.Peer_Comparison).map(([key, value]) => (
              <li key={key} className="text-gray-300 text-sm sm:text-base">
                <strong>{key.replace(/_/g, ' ')}:</strong> {value}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

export default Overview;