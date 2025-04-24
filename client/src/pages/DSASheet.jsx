import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import TopicCard from '../components/TopicCard';
import { api } from '../services/api';

const DSASheet = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const fetchTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching topics...');
      const data = await api.topics.getAll();
      console.log('Received topics:', data);
      
      if (!Array.isArray(data)) {
        console.error('Expected topics to be an array, got:', typeof data);
        setError('Invalid data format received');
        return;
      }

      // Validate topic structure
      const validTopics = data.filter(topic => {
        if (!topic) {
          console.warn('Invalid topic: null or undefined');
          return false;
        }

        const requiredFields = {
          name: 'string',
          level: 'string',
          completed: 'number',
          total: 'number',
          problems: 'array'
        };

        const missingFields = [];
        for (const [field, type] of Object.entries(requiredFields)) {
          if (type === 'array') {
            if (!Array.isArray(topic[field])) {
              missingFields.push(`${field} (expected array)`);
            }
          } else if (typeof topic[field] !== type) {
            missingFields.push(`${field} (expected ${type})`);
          }
        }

        if (missingFields.length > 0) {
          console.warn('Invalid topic structure:', topic, 'Missing or invalid fields:', missingFields);
          return false;
        }

        return true;
      });

      console.log('Setting valid topics:', validTopics);
      setTopics(validTopics);
    } catch (error) {
      console.error('Error fetching topics:', error);
      setError(error.message);
      // Fallback to mock data in development
      if (process.env.NODE_ENV === 'development') {
        const mockData = [
          {
            id: 1,
            name: 'Arrays',
            level: 'Easy',
            completed: 3,
            total: 5,
            problems: [
              {
                id: 1,
                title: 'Two Sum',
                difficulty: 'Easy',
                isCompleted: true,
                leetcodeLink: 'https://leetcode.com/problems/two-sum',
                youtubeLink: 'https://youtube.com/watch?v=...',
                articleLink: 'https://medium.com/...',
              }
            ]
          }
        ];
        console.log('Using mock data:', mockData);
        setTopics(mockData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const filterTopics = (topics) => {
    if (!Array.isArray(topics)) return [];
    
    return topics.filter(topic => {
      if (!topic || typeof topic.name !== 'string' || typeof topic.level !== 'string') {
        return false;
      }

      // Case insensitive search
      const searchMatches = searchQuery.trim() === '' || 
        topic.name.toLowerCase().includes(searchQuery.toLowerCase().trim());

      // Case insensitive filter matching
      const filterMatches = activeFilter === 'all' || 
        topic.level.toLowerCase() === activeFilter.toLowerCase();

      console.log('Filtering topic:', {
        topic,
        searchQuery,
        activeFilter,
        searchMatches,
        filterMatches
      });

      return searchMatches && filterMatches;
    });
  };

  const difficultyFilters = [
    { label: 'All', value: 'all' },
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' }
  ];

  const calculateOverallProgress = () => {
    if (topics.length === 0) return 0;
    const totalCompleted = topics.reduce((acc, topic) => acc + topic.completed, 0);
    const totalProblems = topics.reduce((acc, topic) => acc + topic.total, 0);
    return Math.round((totalCompleted / totalProblems) * 100);
  };

  const handleRetry = () => {
    fetchTopics();
  };

  const handleProblemToggle = () => {
    // Refresh topics to update progress
    fetchTopics();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">DSA Learning Sheet</h1>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="w-full sm:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-500" />
              <div className="flex space-x-2">
                {difficultyFilters.map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      console.log('Setting filter:', filter.value);
                      setActiveFilter(filter.value);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      activeFilter === filter.value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        {!error && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Overall Progress</h2>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500" />
                <span className="text-lg font-medium">{calculateOverallProgress()}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${calculateOverallProgress()}%` }}
              />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <FaExclamationCircle className="h-6 w-6 text-red-500" />
              <div>
                <h3 className="text-lg font-medium text-red-800">Error loading topics</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
            <button
              onClick={handleRetry}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Topics Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterTopics(topics).map((topic) => (
              <TopicCard 
                key={topic.id} 
                topic={topic} 
                onProblemToggle={handleProblemToggle}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filterTopics(topics).length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No topics found</h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No topics match your search "${searchQuery}"`
                : 'Try adjusting your filters'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DSASheet;