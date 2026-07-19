const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * POST /api/ai/planner
 * Generate a travel itinerary using Google Gemini AI
 */
const generateTravelPlan = async (req, res, next) => {
  try {
    const { destination, days, budget, travelStyle } = req.body;

    // Validate required fields
    if (!destination || !days || !budget || !travelStyle) {
      return res.status(400).json({
        success: false,
        message: 'Please provide destination, days, budget, and travelStyle',
      });
    }

    // Validate days is a positive number
    const numDays = Number(days);
    if (!Number.isInteger(numDays) || numDays < 1 || numDays > 30) {
      return res.status(400).json({
        success: false,
        message: 'Days must be a whole number between 1 and 30',
      });
    }

    // Validate API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'AI service is not configured. Please contact the administrator.',
      });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash"});

    // Construct professional prompt
    const prompt = `You are an expert eco-travel planner for EcoStay Connect, a platform that promotes sustainable tourism.

Generate a detailed travel itinerary for a trip to ${destination} for ${numDays} days with a budget of ${budget} and a ${travelStyle} travel style.

IMPORTANT: Return ONLY a valid JSON object with EXACTLY this structure, no markdown, no code fences, no extra text:

{
  "destination": "${destination}",
  "days": ${numDays},
  "budget": "${budget}",
  "travelStyle": "${travelStyle}",
  "itinerary": [
    {
      "day": 1,
      "title": "Day title here",
      "morning": "Morning activity description",
      "afternoon": "Afternoon activity description",
      "evening": "Evening activity description",
      "dailyBudget": "Estimated cost for the day"
    }
  ],
  "foodRecommendations": [
    "Food recommendation 1",
    "Food recommendation 2",
    "Food recommendation 3"
  ],
  "ecoFriendlyTips": [
    "Eco tip 1",
    "Eco tip 2",
    "Eco tip 3"
  ],
  "travelSummary": "A 2-3 sentence summary of the trip highlighting eco-friendly aspects and key experiences."
}

Ensure:
- There are exactly ${numDays} items in the itinerary array (one per day).
- Each day has realistic activities appropriate for ${destination}.
- The dailyBudget reflects the ${budget} budget level.
- Food recommendations are local to ${destination}.
- All activities and tips align with eco-friendly and sustainable travel practices.
- The travelStyle (${travelStyle}) influences the type of activities suggested.`;

    // Generate content with Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Clean the response - remove markdown code fences if present
    let cleanedText = text.trim();
    
    // Remove markdown code block markers if they exist
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.slice(7);
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.slice(3);
    }
    if (cleanedText.endsWith('```')) {
      cleanedText = cleanedText.slice(0, -3);
    }

    cleanedText = cleanedText.trim();

    // Parse the JSON response
    let travelPlan;
    try {
      travelPlan = JSON.parse(cleanedText);
    } catch (parseError) {
      // If parsing fails, try to find JSON object in the text
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        travelPlan = JSON.parse(jsonMatch[0]);
      } else {
        return res.status(500).json({
          success: false,
          message: 'Failed to parse AI response. Please try again.',
        });
      }
    }

    // Validate the response structure
    if (!travelPlan.itinerary || !Array.isArray(travelPlan.itinerary) || travelPlan.itinerary.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'AI generated an incomplete travel plan. Please try again.',
      });
    }

    return res.status(200).json({
      success: true,
      data: travelPlan,
    });
  } catch (error) {
    // Handle Gemini API specific errors
    if (error.message && error.message.includes('API_KEY_INVALID')) {
      return res.status(500).json({
        success: false,
        message: 'AI service configuration error. Please contact the administrator.',
      });
    }
    
    if (error.message && error.message.includes('SAFETY')) {
      return res.status(500).json({
        success: false,
        message: 'Unable to generate travel plan due to content restrictions. Please try different inputs.',
      });
    }

    // Log the error for debugging
    console.error('AI Planner Error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Unable to generate travel plan. Please try again.',
    });
  }
};

module.exports = { generateTravelPlan };