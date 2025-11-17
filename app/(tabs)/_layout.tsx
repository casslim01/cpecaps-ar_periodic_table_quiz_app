import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarStyle: { display: 'none' } // This hides the tab bar for all screens
    }}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: "Quiz"
        }}
      />
      <Tabs.Screen 
        name="module1" 
        options={{
          title: "Module 1"
        }}
      />
      <Tabs.Screen 
        name="module2" 
        options={{
          title: "Module 2"
        }}
      />
      <Tabs.Screen 
        name="module3" 
        options={{
          title: "Module 3"
        }}
      />
    </Tabs>
  );
}