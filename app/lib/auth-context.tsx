// Import necessary hooks and types from React
import {createContext, useContext, useEffect, useState} from 'react';
// Import Appwrite specific types and utilities
import { ID, Models } from 'react-native-appwrite';
// Import the configured Appwrite account instance
import { account } from './appwrite';

// Define the shape of our authentication context
// This type specifies all the values and functions that will be available through the context
type AuthContextType = {
    user: Models.User<Models.Preferences> | null;  // Current user or null if not authenticated
    isLoadingUser: boolean;                        // Loading state for user data
    signUp: (email: string, password: string) => Promise<string | null>; // Sign up function
    signIn: (email: string, password: string) => Promise<string | null>; // Sign in function
    signOut: () => Promise<void>;                  // Sign out function
}

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// AuthProvider component that wraps the app and provides authentication state
export function AuthProvider({ children }: { children: React.ReactNode }) {
    // State to store the current user
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

    // Effect to fetch user data when component mounts
    useEffect(() => {
        getUser();
    },[])

    // Loading state for user data fetching
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

    // Function to get the current user's session
    const getUser = async () => {
        try {
            // Attempt to get current session from Appwrite
            const session = await account.get();
            setUser(session);
        } catch (error) {
            // If no session exists, set user to null
            setUser(null);
        } finally {
            // Always set loading to false when done
            setIsLoadingUser(false);
        }
    }

    // Function to handle user sign up
    const signUp = async (email: string, password: string) => {
        try {
            // Create new account with unique ID
            await account.create(ID.unique(), email, password);
            // Automatically sign in after successful sign up
            await signIn(email, password);
            return null;
        } catch (error) {
            // Handle and return any errors that occur
            if (error instanceof Error) {
                return error.message;
            }
            return 'An unknown error occurred during sign up.';
        }
    }

    // Function to handle user sign in
    const signIn = async (email: string, password: string) => {
        try {
            // Create email/password session with Appwrite
            await account.createEmailPasswordSession(email, password);
            // Get and store user data after successful sign in
            const session = await account.get();
            setUser(session);
            return null;
        } catch (error) {
            // Handle and return any errors that occur
            if (error instanceof Error) {
                return error.message;
            }
            return 'An unknown error occurred during sign in.';
        }
    }

    // Function to handle user sign out
    const signOut = async () => {
        try {
            // Delete the current session from Appwrite
            await account.deleteSession('current');
            // Clear user data from state
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }
  
    // Provide the authentication context to child components
    return (
    <AuthContext.Provider value={{user, isLoadingUser, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
    );
}

// Custom hook to use the auth context
export function useAuth() {
    // Get the context
    const context = useContext(AuthContext);
    // Throw error if hook is used outside of AuthProvider
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    // Return the context
    return context;
}