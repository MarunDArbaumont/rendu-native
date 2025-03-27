import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { TaskProvider } from "@/provider/TaskProvider";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TaskProvider>
        <Tabs screenOptions={{ tabBarActiveTintColor: 'purple', headerShown: false }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
            }}
          />
          <Tabs.Screen
            name="tasks/index"
            options={{
              title: 'Add tasks',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="tasks" color={color} />,
            }}
          />
          <Tabs.Screen
            name="category/index"
            options={{
              title: 'Category',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
            }}
          />
          <Tabs.Screen
            name="category/[category]"
            options={{
              tabBarButton: () => null
            }}
          />
        </Tabs>
      </TaskProvider>
    </SafeAreaView>
  );
}
