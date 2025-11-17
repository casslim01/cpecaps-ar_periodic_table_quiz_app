import {menuStyles as styles} from '../constants/menuStyles';
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../lib/auth-context';

export default function Index() {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const navigateToModule1 = () => {
    router.push('/(tabs)/module1');
  };

  const navigateToModule2 = () => {
    router.push('/(tabs)/module2');
  };

  const navigateToModule3 = () => {
    router.push('/(tabs)/module3');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Chemistry Quiz App</Text>
          <Text style={styles.subtitle}>Select a Module to Begin</Text>
        </View>

        {/* User info */}
        {user && (
          <View style={styles.userContainer}>
            <Text style={styles.userInfo}>
              Welcome, {user.email}
            </Text>
          </View>
        )}

        {/* Module Selection */}
        <View style={styles.modulesContainer}>
          {/* Module 1 Button */}
          <TouchableOpacity
            style={[styles.moduleButton, styles.activeModule]}
            onPress={navigateToModule1}
          >
            <View style={styles.moduleContent}>
              <Text style={styles.moduleTitle}>Module 1</Text>
              <Text style={styles.moduleSubtitle}>Chemical Symbols Quiz</Text>
              <Text style={styles.moduleDescription}>
                Test your knowledge of basic chemical element symbols
              </Text>
              <View style={styles.moduleStatus}>
                <Text style={styles.activeModuleText}>Start Quiz →</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Module 2 Button */}
          <TouchableOpacity
            style={[styles.moduleButton, styles.activeModule]}
            onPress={navigateToModule2}
          >
            <View style={styles.moduleContent}>
              <Text style={styles.moduleTitle}>Module 2</Text>
              <Text style={styles.moduleSubtitle}>Atomic Numbers Quiz</Text>
              <Text style={styles.moduleDescription}>
                Learn and test atomic numbers of common elements
              </Text>
              <View style={styles.moduleStatus}>
                <Text style={styles.activeModuleText}>Start Quiz →</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Module 3 Button */}
          <TouchableOpacity
            style={[styles.moduleButton, styles.activeModule]}
            onPress={navigateToModule3}
          >
            <View style={styles.moduleContent}>
              <Text style={styles.moduleTitle}>Module 3</Text>
              <Text style={styles.moduleSubtitle}>Periodic Groups Quiz</Text>
              <Text style={styles.moduleDescription}>
                Explore element groups and periods in the periodic table
              </Text>
              <View style={styles.moduleStatus}>
                <Text style={styles.activeModuleText}>Start Quiz →</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <View style={styles.signOutContainer}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}