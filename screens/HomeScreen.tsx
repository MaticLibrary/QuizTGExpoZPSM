import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TESTS } from '../data/tests';
import type { HomeNavigation } from '../navigation/types';

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigation>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {TESTS.map((test) => (
          <Pressable
            key={test.id}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() =>
              navigation.navigate('Quiz', { testId: test.id })
            }
          >
            <Text style={styles.cardTitle}>{test.name}</Text>
            <Text style={styles.cardDescription}>{test.description}</Text>
            <Text style={styles.cardCount}>
              {test.numberOfTasks} pytań
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        accessibilityRole="button"
        style={[styles.footer, { paddingBottom: 18 + insets.bottom }]}
        onPress={() => navigation.navigate('Results')}
      >
        <Text style={styles.footerText}>Wyniki</Text>
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
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  card: {
    width: '100%',
    minHeight: 92,
    marginBottom: 12,
    paddingHorizontal: 17,
    paddingVertical: 12,
    justifyContent: 'center',
    backgroundColor: '#f2f5f9',
    borderRadius: 8,
  },
  cardPressed: {
    backgroundColor: '#e7edf5',
  },
  cardTitle: {
    color: '#1d4f83',
    fontSize: 15,
    fontWeight: '700',
  },
  cardDescription: {
    marginTop: 3,
    color: '#565656',
    fontSize: 12,
  },
  cardCount: {
    marginTop: 4,
    color: '#7a7a7a',
    fontSize: 11,
  },
  footer: {
    height: 68,
    backgroundColor: '#123b66',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 13,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
