export interface QuizStatRecord {
  date: string;
  mode: 'choice' | 'manual';
  lessonId?: number;
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
}

export interface UserProgress {
  learnedIds: number[];
  inProgressIds: number[];
  favoriteIds: number[];
  quizHistory: QuizStatRecord[];
  dailyStreak: number;
  lastActiveDate: string;
}

const STORAGE_KEY = 'kanji_master_user_progress_v1';

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        learnedIds: Array.isArray(parsed.learnedIds) ? parsed.learnedIds : [],
        inProgressIds: Array.isArray(parsed.inProgressIds) ? parsed.inProgressIds : [],
        favoriteIds: Array.isArray(parsed.favoriteIds) ? parsed.favoriteIds : [],
        quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
        dailyStreak: typeof parsed.dailyStreak === 'number' ? parsed.dailyStreak : 1,
        lastActiveDate: parsed.lastActiveDate || new Date().toISOString().split('T')[0]
      };
    }
  } catch (e) {
    console.warn('Could not read from localStorage', e);
  }

  return {
    learnedIds: [],
    inProgressIds: [],
    favoriteIds: [],
    quizHistory: [],
    dailyStreak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0]
  };
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Could not save to localStorage', e);
  }
}
