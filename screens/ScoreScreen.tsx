import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { TESTS } from '../data/tests';
import type { Result } from '../data/results';
import type { HomeStackParamList } from '../navigation/types';
import { getJSON, RESULTS_KEY, setJSON } from '../storage/storage';

type Props = NativeStackScreenProps<HomeStackParamList, 'Score'>;

export default function ScoreScreen({ route, navigation }: Props) {
  const [nick, setNick] = useState('');
  const saved = useRef(false);
  const test = TESTS.find((item) => item.id === route.params.testId);

  async function saveResult() {
    if (saved.current) return;
    saved.current = true;

    const now = new Date();
    const date = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('-');

    const result: Result = {
      id: `${Date.now()}-${route.params.testId}`,
      nick: nick.trim() || 'Pseudonim',
      score: route.params.score,
      total: route.params.total,
      type: test?.name ?? route.params.testId,
      date,
    };

    const existing = await getJSON<Result[]>(RESULTS_KEY);
    await setJSON(RESULTS_KEY, [result, ...(existing ?? [])]);
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.score}>
        {route.params.score} / {route.params.total}
      </Text>
      <Text style={styles.testName}>{test?.name ?? 'Test'}</Text>

      <View style={styles.footer}>
        <TextInput
          value={nick}
          onChangeText={setNick}
          placeholder="Pseudonim"
          style={styles.input}
        />
        <Pressable style={styles.saveButton} onPress={() => void saveResult()}>
          <Text style={styles.saveText}>Zapisz wynik</Text>
        </Pressable>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backText}>Wróć do listy testów</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  score: {
    marginTop: 110,
    textAlign: 'center',
    color: '#1d4f83',
    fontSize: 42,
    fontWeight: '700',
  },
  testName: {
    marginTop: 8,
    textAlign: 'center',
    color: '#666666',
  },
  footer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 30,
  },
  input: {
    height: 38,
    borderWidth: 1,
    borderColor: '#d0d9e4',
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  saveButton: {
    height: 44,
    marginTop: 8,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d5d98',
  },
  saveText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  backButton: {
    marginTop: 18,
    alignItems: 'center',
  },
  backText: {
    color: '#1d5d98',
  },
});
