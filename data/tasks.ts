export type Answer = {
  content: string;
  isCorrect: boolean;
};

export type Task = {
  question: string;
  answers: Answer[];
  duration: number;
};

export const TASKS: Record<string, Task[]> = {
  history: [
    {
      question: 'Który władca prowadził wojne domowe z Sullą?',
      answers: [
        { content: 'Lucjusz Cynna', isCorrect: true },
        { content: 'Juliusz Cezar', isCorrect: false },
        { content: 'Lucjusz Murena', isCorrect: false },
        { content: 'Marek Krassus', isCorrect: false },
      ],
      duration: 26,
    },
    {
      question: 'W którym roku rozpoczęła się II wojna światowa?',
      answers: [
        { content: '1939', isCorrect: true },
        { content: '1918', isCorrect: false },
        { content: '1945', isCorrect: false },
        { content: '1929', isCorrect: false },
      ],
      duration: 20,
    },
  ],
  geography: [
    {
      question: 'Która jest stolicą Polski?',
      answers: [
        { content: 'Warszawa', isCorrect: true },
        { content: 'Kraków', isCorrect: false },
        { content: 'Gdańsk', isCorrect: false },
        { content: 'Poznań', isCorrect: false },
      ],
      duration: 20,
    },
    {
      question: 'Najdłuższa rzeka Polski to:',
      answers: [
        { content: 'Wisła', isCorrect: true },
        { content: 'Odra', isCorrect: false },
        { content: 'Warta', isCorrect: false },
        { content: 'Bug', isCorrect: false },
      ],
      duration: 20,
    },
  ],
  informatics: [
    {
      question: 'Jaki język tworzy strukturę strony internetowej?',
      answers: [
        { content: 'HTML', isCorrect: true },
        { content: 'CSS', isCorrect: false },
        { content: 'Python', isCorrect: false },
        { content: 'SQL', isCorrect: false },
      ],
      duration: 20,
    },
    {
      question: 'Co to jest RAM?',
      answers: [
        { content: 'Pamięć robocza', isCorrect: true },
        { content: 'Dysk twardy', isCorrect: false },
        { content: 'System operacyjny', isCorrect: false },
        { content: 'Procesor', isCorrect: false },
      ],
      duration: 20,
    },
  ],
};
