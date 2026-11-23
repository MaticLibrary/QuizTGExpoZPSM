import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import type { HomeStackParamList, RootDrawerParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultsScreen from '../screens/ResultsScreen';
import ScoreScreen from '../screens/ScoreScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Quiz' }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ title: 'Test' }}
      />
      <Stack.Screen
        name="Score"
        component={ScoreScreen}
        options={{ title: 'Wynik', headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ drawerType: 'front' }}
    >
      <Drawer.Screen
        name="Main"
        component={HomeStack}
        options={{ title: 'Ekran główny', headerShown: false }}
      />
      <Drawer.Screen
        name="Results"
        component={ResultsScreen}
        options={{ title: 'Wyniki' }}
      />
    </Drawer.Navigator>
  );
}
