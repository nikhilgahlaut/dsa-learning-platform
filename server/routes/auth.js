import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Helper function to format user response
const formatUserResponse = (user) => {
    console.log('Formatting user response:', user);
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
    };
};
// Register User
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log('Register request body:', { username, email });

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({
            username,
            email,
            password
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log('Saved user:', user);

        // Create JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                // Return both token and user data
                const response = {
                    token,
                    user: formatUserResponse(user)
                };
                console.log('Register response:', response);
                res.json(response);
            }
        );
    } catch (error) {
        console.error('Register error:', error.message);
        res.status(500).send('Server error');
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login request:', { email });

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('Found user:', user);

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                // Return both token and user data
                const response = {
                    token,
                    user: formatUserResponse(user)
                };
                console.log('Login response:', response);
                res.json(response);
            }
        );
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).send('Server error');
    }
});

// Get User Profile (both /me and /profile endpoints)
const getUserProfile = async (req, res) => {
    try {
        console.log('Getting profile for user ID:', req.user.id);
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('Found user profile:', user);
        const response = formatUserResponse(user);
        console.log('Profile response:', response);
        res.json(response);
    } catch (error) {
        console.error('Profile error:', error.message);
        res.status(500).send('Server error');
    }
};

router.get('/me', auth, getUserProfile);
router.get('/profile', auth, getUserProfile);

export default router; 