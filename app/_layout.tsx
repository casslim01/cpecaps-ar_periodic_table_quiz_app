import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "./lib/auth-context";
import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";

function RootLayoutNav() {
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingUser) return; // Wait for auth state to load

    const inAuthGroup = segments[0] === "(auth)";

    if (user && inAuthGroup) {
      // User is signed in and trying to access auth screens, redirect to main app
      router.replace("/(tabs)");
    } else if (!user && !inAuthGroup) {
      // User is not signed in and trying to access protected screens, redirect to auth
      router.replace("/(auth)");
    }
  }, [user, segments, isLoadingUser]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
