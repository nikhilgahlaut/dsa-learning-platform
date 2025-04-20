import express from 'express';
import auth from '../middleware/auth.js';

export const router = express.Router();

// Mock data for initial development
const topics = [
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
  },
  {
    id: 2,
    name: 'Linked Lists',
    level: 'Medium',
    completed: 0,
    total: 3,
    problems: [
      {
        id: 2,
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        isCompleted: false,
        leetcodeLink: 'https://leetcode.com/problems/reverse-linked-list',
        youtubeLink: 'https://youtube.com/watch?v=...',
        articleLink: 'https://medium.com/...',
      }
    ]
  },
  {
    id: 3,
    name: 'Binary Trees',
    level: 'Hard',
    completed: 0,
    total: 5,
    problems: [
      {
        id: 3,
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        isCompleted: false,
        leetcodeLink: 'https://leetcode.com/problems/binary-tree-level-order-traversal',
        youtubeLink: 'https://youtube.com/watch?v=...',
        articleLink: 'https://medium.com/...',
      },
      {
        id: 4,
        title: 'Serialize and Deserialize Binary Tree',
        difficulty: 'Hard',
        isCompleted: false,
        leetcodeLink: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree',
        youtubeLink: 'https://youtube.com/watch?v=...',
        articleLink: 'https://medium.com/...',
      }
    ]
  },
  {
    id: 4,
    name: 'Binary Search Trees',
    level: 'Hard',
    completed: 0,
    total: 4,
    problems: [
      {
        id: 5,
        title: 'Validate Binary Search Tree',
        difficulty: 'Medium',
        isCompleted: false,
        leetcodeLink: 'https://leetcode.com/problems/validate-binary-search-tree',
        youtubeLink: 'https://youtube.com/watch?v=...',
        articleLink: 'https://medium.com/...',
      }
    ]
  },
  {
    id: 5,
    name: 'Dynamic Programming',
    level: 'Hard',
    completed: 0,
    total: 6,
    problems: [
      {
        id: 6,
        title: 'Longest Common Subsequence',
        difficulty: 'Medium',
        isCompleted: false,
        leetcodeLink: 'https://leetcode.com/problems/longest-common-subsequence',
        youtubeLink: 'https://youtube.com/watch?v=...',
        articleLink: 'https://medium.com/...',
      }
    ]
  },
  {
    id: 6,
    name: 'Graphs',
    level: 'Hard',
    completed: 0,
    total: 5,
    problems: [
      {
        id: 7,
        title: 'Course Schedule',
        difficulty: 'Medium',
        isCompleted: false,
        leetcodeLink: 'https://leetcode.com/problems/course-schedule',
        youtubeLink: 'https://youtube.com/watch?v=...',
        articleLink: 'https://medium.com/...',
      }
    ]
  }
];

// Get all topics
router.get('/topics', auth, (req, res) => {
  res.json(topics);
});

// Get a specific topic
router.get('/topics/:id', auth, (req, res) => {
  const topic = topics.find(t => t.id === parseInt(req.params.id));
  if (!topic) {
    return res.status(404).json({ message: 'Topic not found' });
  }
  res.json(topic);
});

// Toggle problem completion
router.patch('/topics/:topicId/problems/:problemId/toggle', auth, (req, res) => {
  const topic = topics.find(t => t.id === parseInt(req.params.topicId));
  if (!topic) {
    return res.status(404).json({ message: 'Topic not found' });
  }

  const problem = topic.problems.find(p => p.id === parseInt(req.params.problemId));
  if (!problem) {
    return res.status(404).json({ message: 'Problem not found' });
  }

  problem.isCompleted = !problem.isCompleted;
  topic.completed = topic.problems.filter(p => p.isCompleted).length;

  res.json({ message: 'Problem status updated', problem });
}); 