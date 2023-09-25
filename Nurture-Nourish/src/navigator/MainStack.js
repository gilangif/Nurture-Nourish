import { createStackNavigator } from "@react-navigation/stack"

import Chat from "../screens/Chat"
import Dashboard from "../screens/Dashboard"
import Camera from "../screens/Camera"
import Preview from "../screens/Preview"
import Test from "../screens/Test"

const Stack = createStackNavigator()

export default function MainStack() {
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
