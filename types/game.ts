export interface GameFormData {
  // Step 1: Upload Drawing
  image?: File;
  imagePreview?: string;

  // Step 2: Learning Details
  subject: string;
  gradeLevel: string;
  topic: string;
  learningObjective: string;
  vocabularyContent: string;

  // Step 3: Game Settings
  gameType: 'platformer' | 'runner' | 'puzzle' | 'quiz' | '';
  difficulty: 'easy' | 'medium' | 'hard';
  includeHints: boolean;
  showProgressFeedback: boolean;
  addEncouragingMessages: boolean;
}

export const SUBJECTS = [
  'Math',
  'Reading',
  'Science',
  'Social Studies',
  'Other',
];

export const GRADE_LEVELS = [
  'Kindergarten',
  '1st Grade',
  '2nd Grade',
  '3rd Grade',
  '4th Grade',
  '5th Grade',
];

export const GAME_TYPES = [
  { id: 'platformer', icon: '🎮', label: 'Platformer', description: 'Jump and collect' },
  { id: 'runner', icon: '🏃', label: 'Runner', description: 'Dodge obstacles' },
  { id: 'puzzle', icon: '🧩', label: 'Puzzle', description: 'Solve to progress' },
  { id: 'quiz', icon: '🎯', label: 'Quiz', description: 'Answer questions' },
];

export const DIFFICULTY_LEVELS = [
  { value: 'easy', emoji: '😊', label: 'Easy', description: 'Perfect for K-2nd grade' },
  { value: 'medium', emoji: '😐', label: 'Medium', description: 'Great for 3rd-4th grade' },
  { value: 'hard', emoji: '😈', label: 'Hard', description: 'Challenge for 5th grade' },
];
