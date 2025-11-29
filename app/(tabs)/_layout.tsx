import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: "#0A0F1F",
          borderTopWidth: 0,
          height: 100,
          paddingBottom: 20,
          paddingTop: 10,
          position: "absolute",
        },

        tabBarItemStyle: {
          paddingHorizontal: 3,
        },

        tabBarActiveTintColor: "#00e676",
        tabBarInactiveTintColor: "#6c748a",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-expense"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="remove-circle" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-income"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={32} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="scan-receipt"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera" size={25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="folder-open" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
