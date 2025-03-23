import { Tabs, useLocalSearchParams } from 'expo-router';
import { Briefcase, Bell, User, HomeIcon } from 'lucide-react-native';

const AppLayout = () =>{
  const params = useLocalSearchParams();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5E5',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <HomeIcon size={size} color={color} />,
        }}
        initialParams={params}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
        initialParams={params}
      />
    </Tabs>
  );
}

export default AppLayout;