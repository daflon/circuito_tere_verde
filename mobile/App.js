import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import TrilhasScreen from './src/screens/TrilhasScreen'
import MapaScreen from './src/screens/MapaScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#166534',
          headerStyle: { backgroundColor: '#166534' },
          headerTintColor: '#fff',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: '🌿 Início' }} />
        <Tab.Screen name="Trilhas" component={TrilhasScreen} />
        <Tab.Screen name="Mapa" component={MapaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
