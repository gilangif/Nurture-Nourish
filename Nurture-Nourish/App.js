import { Text, View } from 'react-native';
import MainStack from './src/navigator/MainStack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./src/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./src/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./src/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./src/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text>Loading...</Text>
    </View>;
  }

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
