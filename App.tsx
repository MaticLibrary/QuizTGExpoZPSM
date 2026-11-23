import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import RootNavigator from './navigation/RootNavigator';
import WelcomeScreen from './screens/WelcomeScreen';
import { acceptTerms, hasAcceptedTerms } from './storage/storage';

export default function App() {
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    hasAcceptedTerms()
      .then((value) => setAccepted(value))
      .catch(() => setAccepted(false));
  }, []);

  async function handleAccept() {
    await acceptTerms();
    setAccepted(true);
  }

  if (accepted === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1d4f83" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      {accepted ? (
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      ) : (
        <WelcomeScreen onAccept={handleAccept} />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
