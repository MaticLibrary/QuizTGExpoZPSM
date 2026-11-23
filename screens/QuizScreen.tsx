import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TESTS } from '../data/tests';
import { TASKS } from '../data/tasks';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Quiz'>;

export default function QuizScreen({ route }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Quiz'>>();
  const test = TESTS.find((item) => item.id === route.params.testId);
  const tasks = TASKS[route.params.testId] ?? [];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [remaining, setRemaining] = useState(tasks[0]?.duration ?? 0);
  const advancing = useRef(false);
  const task = tasks[index];

  function advance(correct: boolean) {
    if (advancing.current) return;
    advancing.current = true;

    const gained = correct ? 1 : 0;
    const nextScore = score + gained;

    if (index >= tasks.length - 1) {
      navigation.replace('Score', {
        testId: route.params.testId,
        score: nextScore,
        total: tasks.length,
      });
      return;
    }

    setScore(nextScore);
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setRemaining(tasks[nextIndex]?.duration ?? 0);
    advancing.current = false;
  }

  useEffect(() => {
    if (!task) return;
    const timer = setInterval(() => {
      setRemaining((left) => (left <= 1 ? 0 : left - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [index, task]);

  useEffect(() => {
    if (remaining === 0 && task) {
      advance(false);
    }
  }, [remaining, task]);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Brak pytań</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <Text style={styles.testName}>{test?.name ?? 'Test'} · {index + 1}/{tasks.length}</Text>
        <Text style={styles.timer}>{remaining}s</Text>
      </View>

      <Text style={styles.question}>{task.question}</Text>

      <View style={styles.answers}>
        {task.answers.map((answer) => (
          <Pressable
            key={answer.content}
            style={styles.answer}
            onPress={() => advance(answer.isCorrect)}
          >
            <Text style={styles.answerText}>{answer.content}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  testName: {
    color: '#777777',
    fontSize: 11,
  },
  timer: {
    color: '#777777',
    fontSize: 11,
  },
  question: {
    marginTop: 18,
    color: '#1d4f83',
    fontSize: 16,
    fontWeight: '700',
  },
  answers: {
    marginTop: 12,
  },
  answer: {
    height: 38,
    marginBottom: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d0d9e4',
    borderRadius: 7,
  },
  answerText: {
    color: '#1d4f83',
    fontSize: 12,
  },
  title: {
    color: '#1d4f83',
    fontSize: 22,
    fontWeight: '700',
  },
});
