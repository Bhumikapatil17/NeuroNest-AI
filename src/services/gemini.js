import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with the key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Create an instance only if the key exists to avoid immediate crashes
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Default model to use
const MODEL_NAME = "gemini-2.5-flash";

export const generateAIResponse = async (prompt, systemInstruction = "") => {
  if (!genAI) {
    throw new Error("Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: systemInstruction 
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error(error.message || "Failed to generate response. Please try again.");
  }
};

// Specialized helper for specific tasks
export const solveDoubt = async (question, simplify = false) => {
  const baseInstruction = "You are an expert AI academic tutor. Explain concepts accurately but in an engaging, student-friendly way.";
  const instruction = simplify 
    ? `${baseInstruction} The student asked for a SIMPLER explanation. Use analogies, very basic vocabulary, and short sentences.` 
    : baseInstruction;
  
  return generateAIResponse(`Explain this academic doubt: ${question}`, instruction);
};

export const generateQuiz = async (topic) => {
  const instruction = "You are an expert quiz creator. Create 5 multiple-choice questions on the given topic. Return ONLY a valid JSON array of objects. Each object should have 'question' (string), 'options' (array of 4 strings), and 'correctAnswer' (string, must exactly match one of the options). Do not include markdown formatting or json code blocks.";
  
  const response = await generateAIResponse(`Create a quiz on: ${topic}`, instruction);
  
  // Extract JSON if the model returns markdown code blocks
  try {
    const jsonStr = response.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (e) {
    throw new Error("Failed to parse the generated quiz. Please try again.");
  }
};

export const generateFlashcards = async (topic) => {
  const instruction = "You are a flashcard generator. Create 10 flashcards for revision. Return ONLY a valid JSON array of objects. Each object should have 'front' (the term or question) and 'back' (the definition or answer). Do not include markdown formatting.";
  
  const response = await generateAIResponse(`Create flashcards for: ${topic}`, instruction);
  
  try {
    const jsonStr = response.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (e) {
    throw new Error("Failed to parse the generated flashcards.");
  }
};

export const summarizeNotes = async (notes) => {
  const instruction = "You are an expert summarizer. Convert the following text into concise, high-yield bullet points for quick revision. Use markdown formatting for better readability.";
  
  return generateAIResponse(`Summarize these notes:\n\n${notes}`, instruction);
};

export const generateTimetable = async (data) => {
  const instruction = "You are an expert academic planner. Create a personalized study timetable. Return ONLY a valid JSON object with a 'schedule' array containing objects with 'day' (e.g., 'Day 1' or date), 'focus' (subject/topic), and 'duration' (hours), and a 'tips' array of strings. Do not include markdown blocks.";
  
  const prompt = `Create a timetable with these constraints:
  Subjects: ${data.subjects}
  Weak Subjects: ${data.weakSubjects}
  Exam Date: ${data.examDates}
  Daily Study Hours: ${data.hoursPerDay}
  Gaps between exams: ${data.examGaps}`;

  const response = await generateAIResponse(prompt, instruction);
  
  try {
    const jsonStr = response.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (e) {
    throw new Error("Failed to parse timetable. Please try again.");
  }
};
