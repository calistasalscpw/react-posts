import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // This function will be called from the Login page
    const login = async (credentials) => {
    // The response from a successful login will now contain the user data
    const { data } = await axios.post('http://localhost:3000/auth/login', credentials, {
        withCredentials: true 
    });
    
    // Set the user state directly from the response
    if (data.user) {
        setUser(data.user);
    }

    return data;
};

    // This function will be called from the Signup page
    const signup = async (userInfo) => {
        return axios.post('http://localhost:3000/auth/signup', userInfo);
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:3000/auth/logout',{}, {
                withCredentials: true
            });
            setUser(null); // Clear user state
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    
    // Checks for a user session when the app loads
    const checkUserSession = async () => {
        try {
            // This relies on the new /profile endpoint (see Step 2)
            const response = await axios.get('http://localhost:3000/auth/profile', {
                withCredentials: true // Important: This sends the cookie with the request
            });
            setUser(response.data);
        } catch (error) {
            console.log('No active session found.');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkUserSession();
    }, []);

    const value = { user, isLoading, login, logout, signup };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily access the context
export const useAuth = () => {
    return useContext(AuthContext);
};