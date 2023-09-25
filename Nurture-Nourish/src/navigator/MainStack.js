import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from "../screens/Chat"
import Dashboard from "../screens/Dashboard"
import Camera from "../screens/Camera"
import Preview from "../screens/Preview"
import Test from "../screens/Test"
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CreateProfileScreen from '../screens/CreateProfile';
import { useEffect, useState } from 'react';
import LayoutScreen from '../screens/LayoutScreen';

export default function MainStack() {
  const Stack = createNativeStackNavigator();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = false;
      setIsAuthenticated(loggedIn);
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return (
      <LayoutScreen>
        <Stack.Navigator screenOptions={{ animation: "none" }}>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegisterScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CreateProfile"
            component={CreateProfileScreen}
          />
        </Stack.Navigator>
      </LayoutScreen>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      <Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
      <Stack.Screen name="Preview" component={Preview} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  )
}


// export default function MainStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Dashboard" component={Dashboard} />
//       <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
//       <Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
//       <Stack.Screen name="Preview" component={Preview} />
//       <Stack.Screen name="Test" component={Test} />
//     </Stack.Navigator>
//   )
// }
