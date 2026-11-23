import { useCallback, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { Result } from '../data/results';
import { getJSON, RESULTS_KEY } from '../storage/storage';

export default function ResultsScreen() {
  const [results, setResults] = useState<Result[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadResults = useCallback(async () => {
    const stored = await getJSON<Result[]>(RESULTS_KEY);
    setResults(Array.isArray(stored) ? stored : []);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadResults();
    }, [loadResults])
  );

  async function refresh() {
    setRefreshing(true);
    try {
      await loadResults();
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          results.length === 0 ? styles.emptyContent : styles.listContent
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nie ma jeszcze żadnych wyników.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.nick}>{item.nick}</Text>
              <Text style={styles.meta}>
                {item.type} · {item.date}
              </Text>
            </View>
            <Text style={styles.result}>
              {item.score}/{item.total}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContent: {
    padding: 16,
  },
  emptyContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#777777',
  },
  row: {
    minHeight: 64,
    marginBottom: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#edf2f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nick: {
    color: '#1d4f83',
    fontWeight: '700',
  },
  meta: {
    marginTop: 4,
    color: '#777777',
    fontSize: 10,
  },
  result: {
    color: '#1d4f83',
    fontSize: 16,
    fontWeight: '700',
  },
});
