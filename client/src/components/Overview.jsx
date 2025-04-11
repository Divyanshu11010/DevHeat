import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Sample response data
const response = {
  "Areas_of_Improvement": "While the candidate shows promise in problem-solving and has achieved a decent rating on LeetCode and CodeChef, there's room for improvement in consistently participating in contests on both platforms. On Codeforces, consistent engagement and advancing beyond the 'newbie' rank would be beneficial. GitHub activity could be increased by contributing more frequently and showcasing projects with better documentation and more real-world utility. Focus on creating more original LinkedIn posts and engaging more actively with their network to improve professional visibility.",
  "Insight_Generation": "The candidate demonstrates a solid foundation in data structures and algorithms, particularly in areas like arrays, strings, and trees, as evidenced by their LeetCode problem-solving activity. A good grasp of C++ is evident across LeetCode and GitHub. Emerging patterns indicate a growing interest in contest participation, especially on LeetCode. Standout achievements include consistent participation in LeetCode contests and a rising rating on CodeChef. The candidate excels in problem-solving using fundamental algorithms, but expanding expertise into advanced algorithms like dynamic programming and graph algorithms would be beneficial. Further, the candidate shows promise in web development skills (JavaScript, CSS, HTML), but consistent effort needs to be put in to realize its potential.",
  "Peer_Comparison": {
    "language_skills": 75,
    "problem_solving_skill": 78,
    "project": 65,
    "social_activity": 55
  },
  "Personalized_Career_Suggestions": "Based on the candidate's proficiency in C++, problem-solving skills, and emerging web development skills, potential career paths include Backend Developer, Software Engineer roles focusing on algorithms and data structures, or Full-Stack Developer. To further explore these pathways, the candidate should consider contributing to open-source projects, building personal projects with real-world utility, and exploring relevant technologies like databases, cloud platforms, and frameworks (e.g., React, Angular, or Vue.js). Certifications in data structures and algorithms or specific web development technologies could also be beneficial.",
  "Profile_Scoring": {
    "activity": 70,
    "score": 72,
    "skills": [
      "C++",
      "Data Structures",
      "Algorithms",
      "JavaScript",
      "CSS",
      "HTML",
      "Problem Solving"
    ],
    "strengths": [
      "Strong problem-solving skills in fundamental data structures and algorithms",
      "Consistent LeetCode contest participation",
      "Rising CodeChef rating",
      "Emerging web development skills (JavaScript, CSS, HTML)"
    ]
  },
  "Recruiter_Readiness_Score": {
    "score": 68
  }
};

// Chart configurations with maintainAspectRatio disabled
const peerComparisonData = {
  labels: Object.keys(response.Peer_Comparison),
  datasets: [
    {
      label: 'Peer Comparison Scores',
      data: Object.values(response.Peer_Comparison),
      backgroundColor: [
        'rgba(239, 68, 68, 0.6)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(234, 179, 8, 0.6)',
        'rgba(16, 185, 129, 0.6)'
      ],
      borderWidth: 1,
    },
  ],
};

const recruiterScoreData = {
  labels: ['Recruiter Readiness Score'],
  datasets: [
    {
      label: 'Recruiter Readiness',
      data: [response.Recruiter_Readiness_Score.score],
      backgroundColor: ['rgba(16, 185, 129, 0.6)'],
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: { color: "#d1d1d1" },
    },
    title: {
      display: true,
      text: '',
      color: "#d1d1d1",
    },
  },
  scales: {
    x: {
      ticks: { color: '#d1d1d1' },
    },
    y: {
      ticks: { color: '#d1d1d1' },
    }
  }
};

function Card({ title, children }) {
  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

function Overview() {
  return (
    <div className="min-h-screen bg-[#121A2A] p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">Candidate Analysis Overview</h1>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* 1. Profile Scoring Card */}
        <Card title="Profile Scoring">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 mb-4">
              <CircularProgressbar
                value={response.Profile_Scoring.score}
                maxValue={100}
                text={`${response.Profile_Scoring.score}%`}
                styles={buildStyles({
                  textColor: '#d1d1d1',
                  pathColor: '#10B981',
                  trailColor: '#374151',
                })}
              />
            </div>
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-2 text-white">Skills</h3>
              <ul className="list-disc pl-5">
                {response.Profile_Scoring.skills.map((skill, index) => (
                  <li key={index} className="text-gray-300">{skill}</li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-white">Strengths</h3>
              <ul className="list-disc pl-5">
                {response.Profile_Scoring.strengths.map((strength, index) => (
                  <li key={index} className="text-gray-300">{strength}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* 2. Recruiter Readiness Score Card */}
        <Card title="Recruiter Readiness Score">
          <div className="flex flex-col items-center">
            {/* Centered Circular Progressbar in fixed-size container */}
            <div className="w-full h-64 mb-4 flex items-center justify-center">
              <div className="w-32 h-32">
                <CircularProgressbar
                  value={response.Recruiter_Readiness_Score.score}
                  maxValue={100}
                  text={`${response.Recruiter_Readiness_Score.score}%`}
                  styles={buildStyles({
                    textColor: '#d1d1d1',
                    pathColor: '#10B981',
                    trailColor: '#374151',
                  })}
                />
              </div>
            </div>

            <p className="text-lg text-gray-300">
              <strong>Score: </strong> {response.Recruiter_Readiness_Score.score}
            </p>
          </div>
        </Card>


        {/* 3. Insight Generation Card */}
        <Card title="Insight Generation">
          <p className="text-gray-300">{response.Insight_Generation}</p>
        </Card>

        {/* 4. Personalized Career Pathway Suggestions Card */}
        <Card title="Personalized Career Pathway Suggestions">
          <p className="text-gray-300">{response.Personalized_Career_Suggestions}</p>
        </Card>

        {/* 5. Peer Comparison Card */}
        <Card title="Peer Comparison">
          <div className="w-full h-64 mb-4">
            <Bar
              data={peerComparisonData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { ...chartOptions.plugins.title, text: 'Peer Comparison' }
                },
              }}
            />
          </div>
          <ul className="list-disc pl-5">
            {Object.entries(response.Peer_Comparison).map(([key, value]) => (
              <li key={key} className="text-gray-300">
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