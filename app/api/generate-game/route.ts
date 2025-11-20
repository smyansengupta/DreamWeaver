import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getGameTemplate, Problem } from '@/lib/game-template';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GenerateGameRequest {
  subject: string;
  gradeLevel: string;
  topic: string;
  learningObjective: string;
  vocabularyContent?: string;
  gameType: string;
  difficulty: string;
  includeHints: boolean;
  showProgressFeedback: boolean;
  addEncouragingMessages: boolean;
  sketchAnalysis?: any;
}

export async function POST(request: NextRequest) {
  try {
    const data: GenerateGameRequest = await request.json();

    // Build prompt to generate ONLY the problems array
    const prompt = buildProblemsGenerationPrompt(data);

    // Call Claude API to generate educational content
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract the response
    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Parse the problems array from Claude's response
    let problems: Problem[] = [];

    // Try to extract JSON from response (handle both raw JSON and markdown code blocks)
    const jsonMatch = responseText.match(/```(?:json)?\n?([\s\S]*?)\n?```/) ||
                      responseText.match(/(\[[\s\S]*\])/);

    if (jsonMatch) {
      try {
        problems = JSON.parse(jsonMatch[1].trim());
      } catch (parseError) {
        console.error('Error parsing problems JSON:', parseError);
        // Fallback problems
        problems = generateFallbackProblems(data);
      }
    } else {
      // Fallback if no JSON found
      problems = generateFallbackProblems(data);
    }

    // Validate problems array
    if (!Array.isArray(problems) || problems.length === 0) {
      problems = generateFallbackProblems(data);
    }

    // Use the proven template with the generated problems
    const gameCode = getGameTemplate(
      data.subject,
      data.topic,
      data.gradeLevel,
      problems,
      data.difficulty
    );

    // Generate metadata
    const metadata = {
      subject: data.subject,
      gradeLevel: data.gradeLevel,
      topic: data.topic,
      gameType: data.gameType,
      difficulty: data.difficulty,
      generatedAt: new Date().toISOString(),
      features: {
        hints: data.includeHints,
        progressFeedback: data.showProgressFeedback,
        encouragingMessages: data.addEncouragingMessages,
      },
    };

    return NextResponse.json({
      success: true,
      gameCode,
      metadata,
    });

  } catch (error) {
    console.error('Error generating game:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate game',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function buildProblemsGenerationPrompt(data: GenerateGameRequest): string {
  const {
    subject,
    gradeLevel,
    topic,
    learningObjective,
    vocabularyContent,
    sketchAnalysis,
  } = data;

  let contentGuidance = '';

  // If teacher provided educational content through sketch analysis, use it
  if (sketchAnalysis?.educational_elements) {
    const elements = sketchAnalysis.educational_elements;
    contentGuidance = '\n\n**Teacher-Provided Content:**\n';

    if (elements.problems && elements.problems.length > 0) {
      contentGuidance += `Questions: ${elements.problems.join(', ')}\n`;
    }
    if (elements.correct_answers && elements.correct_answers.length > 0) {
      contentGuidance += `Correct Answers: ${elements.correct_answers.join(', ')}\n`;
    }
    if (elements.incorrect_answers && elements.incorrect_answers.length > 0) {
      contentGuidance += `Wrong Answer Options: ${elements.incorrect_answers.join(', ')}\n`;
    }
    if (elements.vocabulary_words && elements.vocabulary_words.length > 0) {
      contentGuidance += `Vocabulary: ${elements.vocabulary_words.join(', ')}\n`;
    }
  }

  return `You are an expert educational content developer. Generate educational problems for a ${gradeLevel} student learning about "${topic}" in ${subject}.

**Learning Objective**: ${learningObjective}
${vocabularyContent ? `**Focus Content**: ${vocabularyContent}` : ''}
${contentGuidance}

Generate 5-8 age-appropriate problems in this EXACT JSON format:

[
  {
    "question": "2 × 3 = ?",
    "answer": 6,
    "wrong": [4, 8, 10]
  },
  {
    "question": "4 × 5 = ?",
    "answer": 20,
    "wrong": [15, 25, 30]
  }
]

Requirements:
- **question**: Clear, concise question appropriate for ${gradeLevel} students
- **answer**: Single correct answer (number for math, string for other subjects)
- **wrong**: Array of 3 plausible incorrect answers (common mistakes students make)

Subject-Specific Guidelines:

**For Math**:
- Use clear operators: × for multiplication, ÷ for division, + - as normal
- Include "= ?" at the end of each question
- Wrong answers should be close to correct (off by ±5 for addition/subtraction, common multiplication errors)
- Examples: "7 + 8 = ?", "12 - 5 = ?", "3 × 4 = ?", "15 ÷ 3 = ?"

**For Science**:
- Use clear terminology appropriate for grade level
- Wrong answers should be common misconceptions
- Example: {"question": "What is H2O?", "answer": "Water", "wrong": ["Salt", "Air", "Sugar"]}

**For Language Arts**:
- Test vocabulary, grammar, or reading comprehension
- Example: {"question": "Synonym for 'happy'?", "answer": "Joyful", "wrong": ["Sad", "Angry", "Tired"]}

**For Social Studies**:
- Focus on facts, dates, places, concepts
- Example: {"question": "Capital of France?", "answer": "Paris", "wrong": ["London", "Berlin", "Rome"]}

Return ONLY the JSON array, no explanation.`;
}

function generateFallbackProblems(data: GenerateGameRequest): Problem[] {
  const { subject, gradeLevel, topic } = data;

  // Generate simple fallback problems based on subject and grade level
  // This ensures the game always works even if Claude API fails

  if (subject.toLowerCase().includes('math')) {
    // Simple math problems appropriate for grade level
    const level = gradeLevel.toLowerCase();

    if (level.includes('k') || level.includes('1') || level.includes('2')) {
      // K-2nd grade: Simple addition and subtraction
      return [
        { question: '2 + 3 = ?', answer: 5, wrong: [4, 6, 7] },
        { question: '5 - 2 = ?', answer: 3, wrong: [2, 4, 7] },
        { question: '4 + 1 = ?', answer: 5, wrong: [3, 4, 6] },
        { question: '6 - 3 = ?', answer: 3, wrong: [2, 4, 5] },
        { question: '3 + 2 = ?', answer: 5, wrong: [4, 6, 1] },
      ];
    } else if (level.includes('3') || level.includes('4')) {
      // 3rd-4th grade: Multiplication basics
      return [
        { question: '2 × 3 = ?', answer: 6, wrong: [4, 8, 5] },
        { question: '4 × 5 = ?', answer: 20, wrong: [15, 25, 24] },
        { question: '3 × 3 = ?', answer: 9, wrong: [6, 12, 10] },
        { question: '5 × 2 = ?', answer: 10, wrong: [8, 12, 7] },
        { question: '6 × 3 = ?', answer: 18, wrong: [15, 20, 21] },
      ];
    } else {
      // 5th grade+: Harder multiplication/division
      return [
        { question: '7 × 8 = ?', answer: 56, wrong: [54, 63, 48] },
        { question: '9 × 6 = ?', answer: 54, wrong: [56, 48, 63] },
        { question: '12 × 5 = ?', answer: 60, wrong: [55, 65, 50] },
        { question: '8 × 7 = ?', answer: 56, wrong: [63, 49, 54] },
        { question: '11 × 4 = ?', answer: 44, wrong: [40, 48, 42] },
      ];
    }
  }

  // Generic fallback for non-math subjects
  return [
    { question: `What is ${topic}?`, answer: 'A', wrong: ['B', 'C', 'D'] },
    { question: `Name a key concept in ${topic}`, answer: 'Concept 1', wrong: ['Concept 2', 'Concept 3', 'Concept 4'] },
    { question: `${topic} is important because?`, answer: 'Reason A', wrong: ['Reason B', 'Reason C', 'Reason D'] },
    { question: `Which is true about ${topic}?`, answer: 'Fact 1', wrong: ['Myth 1', 'Myth 2', 'Myth 3'] },
    { question: `Best example of ${topic}?`, answer: 'Example A', wrong: ['Example B', 'Example C', 'Example D'] },
  ];
}
