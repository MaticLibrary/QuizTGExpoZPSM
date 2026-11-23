import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { TESTS } from '../data/tests';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Quiz'>;

export default function QuizScreen({ route }: Props) {
  const test = TESTS.find((item) => item.id === route.params.testId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{test?.name ?? 'Test'}</Text>
      <Text style={styles.description}>
        {test?.description ?? 'Nieznany test'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#1d4f83',
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    marginTop: 8,
    color: '#666666',
  },
});
