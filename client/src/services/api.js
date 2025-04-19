const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

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
          body: JSON.stringify(credentials),
          credentials: 'include',
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    
    register: async (userData) => {
      try {
        console.log('Making register request to:', `${API_URL}/auth/register`);
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
          credentials: 'include',
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Register error:', error);
        throw error;
      }
    },
    
    logout: async () => {
      try {
        const response = await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    },
    
    getProfile: async () => {
      try {
        const response = await fetch(`${API_URL}/auth/profile`, {
          credentials: 'include',
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
        const response = await fetch(`${API_URL}/dsa/topics`, {
          credentials: 'include',
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Get topics error:', error);
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        const response = await fetch(`${API_URL}/dsa/topics/${id}`, {
          credentials: 'include',
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Get topic error:', error);
        throw error;
      }
    },
  },

  progress: {
    toggle: async (problemId) => {
      try {
        const response = await fetch(`${API_URL}/dsa/progress/${problemId}`, {
          method: 'POST',
          credentials: 'include',
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Toggle progress error:', error);
        throw error;
      }
    },
    
    get: async () => {
      try {
        const response = await fetch(`${API_URL}/dsa/progress`, {
          credentials: 'include',
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Get progress error:', error);
        throw error;
      }
    },
  }
}; 