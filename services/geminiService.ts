
import { GoogleGenAI, Type } from "@google/genai";

// Initialize and export services for story refinement
export const refineStory = async (storyText: string) => {
  // Always create a new GoogleGenAI instance before making a call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Please refine and proofread this personal story for a legacy book. Maintain the author's original voice but improve flow, clarity, and grammar. 
      ---
      Story: ${storyText}
      ---`,
    });
    return response.text || storyText;
  } catch (error) {
    console.error("Error refining story:", error);
    return storyText;
  }
};

// Generate a new biographical prompt using Gemini's reasoning capabilities
export const generateNewPrompt = async (existingQuestions: string[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a new, thoughtful biographical writing prompt for someone writing their life story. 
      Avoid these existing questions: ${existingQuestions.join(', ')}.
      The question should be open-ended and evoke deep memories.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            category: { type: Type.STRING, enum: ['Childhood', 'Family', 'Career', 'Adventures', 'Wisdom'] }
          },
          required: ["question", "category"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error generating prompt:", error);
    return null;
  }
};

// Generate an illustration for a story using gemini-2.5-flash-image
export const generateStoryImage = async (storySnippet: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A nostalgic, warm, painterly illustration for a family history book based on this story: ${storySnippet}. Soft lighting, heartwarming, oil painting style.` }]
      },
      config: {
        imageConfig: { aspectRatio: "4:3" }
      }
    });
    
    // Find the image part in the response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
