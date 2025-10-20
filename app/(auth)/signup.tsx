// Import core React Native components for layout and platform-specific behavior
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
// Import Material Design components from react-native-paper
import { Text, TextInput, Button, useTheme } from "react-native-paper";
// Import React hooks for state management
import { useState } from "react";
// Import custom authentication hook
import { useAuth } from "../lib/auth-context";
// Import routing utilities from Expo
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  // State for storing user's email input
  const [email, setEmail] = useState<string>("");
  // State for storing user's password input
  const [password, setPassword] = useState<string>("");
  // State for storing password confirmation
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // State for handling and displaying error messages
  const [error, setError] = useState<string | null>(null);
  // State for loading indicator
  const [loading, setLoading] = useState<boolean>(false);

  // Access theme colors and styles from react-native-paper
  const theme = useTheme();

  // Extract authentication functions from our custom hook
  const { signUp } = useAuth();

  // Initialize router for navigation
  const router = useRouter();

  // Handle sign up logic
  const handleSignUp = async () => {
    // Validate that all fields are filled
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear any previous errors and set loading
    setError(null);
    setLoading(true);

    try {
      // Handle sign up flow
      const error = await signUp(email, password);
      if (error) {
        setError(error);
        return;
      }

      // Navigate to sign in screen after successful sign up
      router.replace("/index");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to sign in screen
  const navigateToSignIn = () => {
    router.push("/index");
  };

  return (
    // Adjust view to avoid keyboard overlap
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      {/* Main content container */}
      <View style={styles.content}>
        {/* Header text */}
        <Text style={styles.title} variant="headlineMedium">
          Create Account
        </Text>
        <Text style={styles.subtitle} variant="bodyLarge">
          Join us to start your quiz journey
        </Text>

        {/* Email input field */}
        <TextInput 
          label="Email"
          value={email}
          autoCapitalize="none" // Prevent auto-capitalization
          keyboardType="email-address" // Show email-optimized keyboard
          placeholder="example@gmail.com"
          mode="outlined"
          style={styles.input}
          onChangeText={setEmail}
          disabled={loading}
        />

        {/* Password input field */}
        <TextInput 
          label="Password"
          value={password}
          autoCapitalize="none"
          keyboardType="default"
          secureTextEntry={true} // Hide password characters
          placeholder="Enter your password"
          mode="outlined"
          style={styles.input}
          onChangeText={setPassword}
          disabled={loading}
        />

        {/* Confirm password input field */}
        <TextInput 
          label="Confirm Password"
          value={confirmPassword}
          autoCapitalize="none"
          keyboardType="default"
          secureTextEntry={true} // Hide password characters
          placeholder="Confirm your password"
          mode="outlined"
          style={styles.input}
          onChangeText={setConfirmPassword}
          disabled={loading}
        />

        {/* Conditional error message display */}
        {error && (
          <Text style={{ color: theme.colors.error, marginBottom: 12 }}>
            {error}
          </Text>
        )}

        {/* Sign up button */}
        <Button 
          mode="contained"
          style={styles.button}
          onPress={handleSignUp}
          loading={loading}
          disabled={loading}>
          Create Account
        </Button>

        {/* Navigate to sign in button */}
        <Button 
          mode="text" 
          onPress={navigateToSignIn}
          style={styles.switchModeButton}
          disabled={loading}>
          Already have an account? Sign In
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

// Styles for component layout and appearance
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    opacity: 0.7,
  },
  input: {
    marginBottom: 12,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  }
});