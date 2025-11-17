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

export default function SignInScreen() {
  // State for storing user's email input
  const [email, setEmail] = useState<string>("");
  // State for storing user's password input
  const [password, setPassword] = useState<string>("");
  // State for handling and displaying error messages
  const [error, setError] = useState<string | null>(null);
  // State for loading indicator
  const [loading, setLoading] = useState<boolean>(false);

  // Access theme colors and styles from react-native-paper
  const theme = useTheme();

  // Extract authentication functions from our custom hook
  const { signIn } = useAuth();

  // Initialize router for navigation
  const router = useRouter();

  // Handle sign in logic
  const handleSignIn = async () => {
    // Validate that both fields are filled
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Clear any previous errors and set loading
    setError(null);
    setLoading(true);

    try {
      // Handle sign in flow
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }

      // Navigate to main app after successful sign in
      router.replace("/(tabs)");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to sign up screen
  const navigateToSignUp = () => {
    router.push("/signup");
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
          Periodic Table Quiz App
        </Text>
        <Text style={styles.subtitle} variant="bodyLarge">
          Sign in to continue
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

        {/* Conditional error message display */}
        {error && (
          <Text style={{ color: theme.colors.error, marginBottom: 12 }}>
            {error}
          </Text>
        )}

        {/* Sign in button */}
        <Button 
          mode="contained"
          style={styles.button}
          onPress={handleSignIn}
          loading={loading}
          disabled={loading}>
          Sign In
        </Button>

        {/* Navigate to sign up button */}
        <Button 
          mode="text" 
          onPress={navigateToSignUp}
          style={styles.switchModeButton}
          disabled={loading}>
          Don't have an account? Sign Up
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