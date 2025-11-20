import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const subject = formData.get('subject') as string || '';
    const gradeLevel = formData.get('gradeLevel') as string || '';
    const topic = formData.get('topic') as string || '';

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Determine media type
    const mediaType = image.type as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

    // Create the analysis prompt
    const prompt = `You are an expert educational game designer analyzing a teacher's hand-drawn game sketch.

The teacher is creating a learning game for:
${subject ? `- Subject: ${subject}` : ''}
${gradeLevel ? `- Grade Level: ${gradeLevel}` : ''}
${topic ? `- Topic: ${topic}` : ''}

Analyze this sketch and identify the educational game elements. Look for:

1. **Character/Player**: The hero students will control (stick figure, animal, robot, etc.)
2. **Game Structure**: Type of game (platformer with platforms to jump on, runner/endless runner, maze/path, quiz format, etc.)
3. **Platforms/Paths**: Any surfaces, platforms, or paths the character moves on
4. **Obstacles**: Enemies, barriers, or challenges to avoid
5. **Collectibles**: Items to collect (stars, coins, correct answers, etc.)
6. **Goal/Endpoint**: Finish line, trophy, final destination
7. **Educational Elements**: Any math problems, vocabulary words, questions, facts, or learning content visible

Return a JSON object with this exact structure:
{
  "character": {
    "type": "description of character (e.g., 'student', 'robot', 'animal')",
    "style": "description of art style (e.g., 'friendly', 'cartoonish', 'simple')"
  },
  "game_structure": "brief description of the game type and layout",
  "platforms": [
    {"x": 0, "y": 0, "width": 100, "height": 20, "label": "optional label or educational content"}
  ],
  "obstacles": [
    {"type": "enemy/barrier/etc", "label": "optional label"}
  ],
  "collectibles": [
    {"type": "star/coin/etc", "label": "optional value", "is_correct": true}
  ],
  "goal": {
    "type": "finish/trophy/etc",
    "message": "success message"
  },
  "educational_elements": {
    "problems": ["any visible problems or questions"],
    "correct_answers": ["correct answer values"],
    "incorrect_answers": ["wrong answer values"],
    "vocabulary_words": ["any vocabulary words"],
    "facts": ["any educational facts"]
  },
  "summary": "A friendly 2-3 sentence summary of what you found in the sketch, written as if talking to the teacher"
}

Be encouraging and positive! If the sketch is rough or unclear, make reasonable interpretations. Focus on what IS there rather than what's missing.

IMPORTANT: Return ONLY valid JSON, no markdown formatting or extra text.`;

    // Call Claude Vision API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    });

    // Extract the response text
    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Parse JSON from response (handle potential markdown code blocks)
    let analysisData;
    try {
      // Remove markdown code blocks if present
      const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysisData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText);
      return NextResponse.json(
        { error: 'Failed to parse analysis results', details: responseText },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      analysis: analysisData,
    });

  } catch (error) {
    console.error('Error analyzing sketch:', error);
    return NextResponse.json(
      { error: 'Failed to analyze sketch', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
