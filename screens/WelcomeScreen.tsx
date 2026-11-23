import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  onAccept: () => void | Promise<void>;
};

export default function WelcomeScreen({ onAccept }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Zanim zaczniemy</Text>
        <Text style={styles.text}>
          Aplikacja przechowuje wyniki quizów wyłącznie na tym urządzeniu.
          Wynik zawiera podsumowanie, licznik punktów i nazwę testu.
        </Text>
        <Text style={styles.text}>
          Ten ekran pojawia się tylko przy pierwszym uruchomieniu.
        </Text>
      </View>

      <Pressable
        style={[styles.button, { marginBottom: 18 + insets.bottom }]}
        onPress={onAccept}
      >
        <Text style={styles.buttonText}>Akceptuję</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 58,
  },
  title: {
    color: '#1d4f83',
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    marginTop: 16,
    color: '#666666',
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    height: 44,
    marginHorizontal: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d5d98',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
