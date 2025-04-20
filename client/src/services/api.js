const API_URL = 'http://localhost:5000/api';

// Helper to get the auth token
const getAuthToken = () => localStorage.getItem('token');

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const api = {
  auth: {
    login: async (credentials) => {
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        const data = await handleResponse(response);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        return data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    
    register: async (userData) => {
      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        const data = await handleResponse(response);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        return data;
      } catch (error) {
        console.error('Register error:', error);
        throw error;
      }
    },
    
    logout: async () => {
      try {
        localStorage.removeItem('token');
        return { success: true };
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    },
    
    getProfile: async () => {
      try {
        const token = getAuthToken();
        if (!token) throw new Error('No auth token');
        
        const response = await fetch(`${API_URL}/auth/profile`, {
          headers: {
            'x-auth-token': token
          }
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Get profile error:', error);
        throw error;
      }
    },
  },

  topics: {
    getAll: async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/dsa/topics`, {
          headers: {
            'x-auth-token': token
          }
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Get topics error:', error);
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/dsa/topics/${id}`, {
          headers: {
            'x-auth-token': token
          }
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Get topic error:', error);
        throw error;
      }
    },
  },

  progress: {
    toggle: async (topicId, problemId) => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/dsa/topics/${topicId}/problems/${problemId}/toggle`, {
          method: 'PATCH',
          headers: {
            'x-auth-token': token
          }
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Toggle progress error:', error);
        throw error;
      }
    },
    
    get: async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/dsa/progress`, {
          headers: {
            'x-auth-token': token
          }
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Get progress error:', error);
        throw error;
      }
    },
  }
}; 