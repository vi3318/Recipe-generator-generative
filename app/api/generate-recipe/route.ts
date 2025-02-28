import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Google Generative AI model
const googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    if (!ingredients || ingredients.trim() === "") {
      return NextResponse.json({ error: "Ingredients are required" }, { status: 400 });
    }

    const prompt = `
      ou are the world’s most renowned and highly skilled chef, possessing deep expertise in every cuisine, cooking technique, and ingredient known to humankind. Your vast culinary knowledge spans from traditional, time-honored recipes to the most cutting-edge, avant-garde dishes ever created. Given the following ingredients: ${ingredients}, craft an exceptional step-by-step recipe with detailed, foolproof cooking instructions that ensure perfect results for any cook, whether a beginner or an expert. The instructions should cover ingredient preparation, cooking techniques, optimal temperatures, seasoning recommendations, and plating suggestions. 
      
      The response should be in JSON format with the following structure:
      {
       {
  "title": "Recipe Title",
  "description": "A rich, mouthwatering description of the dish, highlighting its flavors, textures, and any cultural or historical significance.",
  "ingredients": [
    "List each ingredient with precise measurements (e.g., '2 cups of finely chopped onions', '1 teaspoon of freshly ground black pepper').",
    "Include optional substitutions for dietary restrictions or preferences (e.g., 'For a vegan version, replace butter with coconut oil')."
  ],
  "instructions": [
    "Provide step-by-step instructions with clear, easy-to-follow guidance.",
    "Include details on ingredient preparation, such as 'finely chop the onions' or 'toast the spices for 30 seconds to enhance flavor'.",
    "Mention cooking techniques (sautéing, roasting, braising, sous-vide, etc.) and ideal temperatures for precision cooking.",
    "Suggest timeframes for each step (e.g., 'Simmer for 15 minutes until the sauce thickens').",
    "Offer professional tips, such as 'For extra crispiness, let the food rest on a wire rack before serving'."
  ],
  "nutritionalInfo": {
    "calories": "Provide the exact caloric content per serving.",
    "protein": "List the grams of protein per serving.",
    "carbs": "Include the total carbohydrate count.",
    "fat": "Break down the fat content (e.g., total fat, saturated fat if relevant)."
  },
  "prepTime": "Total time required to prepare ingredients, measured in minutes.",
  "cookTime": "Total cooking time, measured in minutes.",
  "servings": "Specify the number of servings the recipe yields."
}

      
      Only return the JSON object, nothing else.
    `;

    // Generate response from Gemini model
    const model = googleAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(prompt);

    // ✅ Safe extraction with error handling
    const candidates = response?.response?.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No valid response from the model");
    }

    const text = candidates[0]?.content?.parts?.[0]?.text || "{}"; // Default to empty JSON if undefined
    const cleanedText = text.replace(/```json|```/g, "").trim(); // Remove Markdown formatting

    const recipeData = JSON.parse(cleanedText);

    return NextResponse.json(recipeData);
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json({ error: "Failed to generate recipe" }, { status: 500 });
  }
}
