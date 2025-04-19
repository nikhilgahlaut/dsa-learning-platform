import { useState } from 'react';
import { FaYoutube, FaLink, FaCheckCircle, FaRegCircle, FaExternalLinkAlt } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';

const ProblemItem = ({ problem, onToggle }) => {
  const handleToggleCompletion = async () => {
    try {
      await onToggle();
    } catch (error) {
      console.error('Error toggling problem completion:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'text-green-600',
      Medium: 'text-yellow-600',
      Hard: 'text-red-600'
    };
    return colors[difficulty] || 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleToggleCompletion}
              className="focus:outline-none"
              aria-label="Toggle completion status"
            >
              {problem.isCompleted ? (
                <FaCheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <FaRegCircle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
            <h3 className="text-lg font-medium text-gray-900">{problem.title}</h3>
            <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-3">
            {problem.leetcodeLink && (
              <a
                href={problem.leetcodeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-indigo-600"
              >
                <SiLeetcode className="h-4 w-4" />
                <span>LeetCode</span>
                <FaExternalLinkAlt className="h-3 w-3" />
              </a>
            )}
            
            {problem.codeforcesLink && (
              <a
                href={problem.codeforcesLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-indigo-600"
              >
                <SiCodeforces className="h-4 w-4" />
                <span>CodeForces</span>
                <FaExternalLinkAlt className="h-3 w-3" />
              </a>
            )}
            
            {problem.youtubeLink && (
              <a
                href={problem.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm text-red-600 hover:text-red-700"
              >
                <FaYoutube className="h-4 w-4" />
                <span>Tutorial</span>
                <FaExternalLinkAlt className="h-3 w-3" />
              </a>
            )}
            
            {problem.articleLink && (
              <a
                href={problem.articleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-indigo-600"
              >
                <FaLink className="h-4 w-4" />
                <span>Article</span>
                <FaExternalLinkAlt className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemItem;
