import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ProblemItem from "./ProblemItem";
import { api } from '../services/api';

export default function TopicCard({ topic, onProblemToggle }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const levelColors = {
    Easy: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Hard: 'bg-red-100 text-red-800 border-red-200',
  };

  const progressPercentage = (topic.completed / topic.total) * 100;

  const handleProblemToggle = async (problemId) => {
    try {
      const response = await api.progress.toggle(problemId);
      if (response.message === 'Progress updated successfully') {
        if (onProblemToggle) {
          onProblemToggle();
        }
      }
    } catch (error) {
      console.error('Error toggling problem:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{topic.name}</h2>
          {!topic.isMainTopic && (
            <p className="text-sm text-gray-500 mt-1">
              {topic.completed} of {topic.total} completed
            </p>
          )}
        </div>
        {!topic.isMainTopic && (
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${levelColors[topic.level]}`}>
            {topic.level}
          </span>
        )}
      </div>

      {/* Progress bar - only show for subtopics */}
      {!topic.isMainTopic && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <span className="text-sm font-medium">
          {isExpanded ? 'Hide' : 'Show'} {topic.isMainTopic ? 'Topics' : 'Problems'}
        </span>
        {isExpanded ? (
          <FaChevronUp className="h-4 w-4" />
        ) : (
          <FaChevronDown className="h-4 w-4" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {topic.isMainTopic ? (
            // Render subtopics for main topics
            topic.subtopics?.map((subtopic) => (
              <TopicCard 
                key={subtopic.id} 
                topic={subtopic} 
                onProblemToggle={onProblemToggle}
              />
            ))
          ) : (
            // Render problems for subtopics
            topic.problems?.map((problem) => (
              <ProblemItem 
                key={problem.id} 
                problem={problem} 
                onToggle={() => handleProblemToggle(problem.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
