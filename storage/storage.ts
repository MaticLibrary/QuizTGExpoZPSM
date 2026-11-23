import AsyncStorage from '@react-native-async-storage/async-storage';

export const TERMS_KEY = 'quiz.termsAccepted';
export const RESULTS_KEY = 'quiz.results';

export async function getJSON<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (raw === null) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    await AsyncStorage.removeItem(key);
    return null;
  }
}

export async function setJSON(key: string, value: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function hasAcceptedTerms(): Promise<boolean> {
  return (await getJSON<boolean>(TERMS_KEY)) === true;
}

export async function acceptTerms(): Promise<void> {
  await setJSON(TERMS_KEY, true);
}
