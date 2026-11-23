import { StyleSheet, Text, View } from 'react-native';

export default function ResultsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wyniki</Text>
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
});
