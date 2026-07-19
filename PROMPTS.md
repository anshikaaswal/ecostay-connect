# AI Travel Planner — Prompt Engineering Guide

## Overview

The EcoStay Connect AI Planner uses Google Gemini API to generate personalized, eco-friendly travel itineraries. This document explains the prompt engineering strategy behind three different prompt versions, and why version 3 is production-ready.

---

## Prompt 1 — Simple Itinerary

```
Generate a travel itinerary for {destination} for {days} days.
```

### Characteristics
- Single sentence, no structure
- No budget or travel style awareness
- Returns unstructured text
- No JSON formatting instruction

### Problems
- Gemini returns free-form paragraphs — not parseable by the backend
- No guarantee of eco-friendly content
- Cannot control output structure
- No validation possible on the backend

---

## Prompt 2 — Detailed Itinerary with Budget

```
Generate a detailed travel itinerary for {destination} for {days} days 
with a budget of {budget} and a {travelStyle} travel style.

Return the response in JSON format with:
- Day-wise itinerary with morning, afternoon, and evening activities
- Food recommendations
- Travel tips
```

### Improvements
- Added budget and travel style parameters
- Requested JSON output
- Specified required sections

### Remaining Issues
- JSON format is requested but not strictly enforced — Gemini may still return markdown or extra text
- No explicit fallback parsing instructions
- No role assignment — Gemini responds generically
- No constraint on number of days or daily breakdown

---

## Prompt 3 — Role-Based Travel Planner Prompt (Production)

```
You are an expert eco-travel planner for EcoStay Connect, a platform 
that promotes sustainable tourism.

Generate a detailed travel itinerary for a trip to {destination} for 
{days} days with a budget of {budget} and a {travelStyle} travel style.

IMPORTANT: Return ONLY a valid JSON object with EXACTLY this structure, 
no markdown, no code fences, no extra text:

{
  "destination": "{destination}",
  "days": {days},
  "budget": "{budget}",
  "travelStyle": "{travelStyle}",
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
  "foodRecommendations": [...],
  "ecoFriendlyTips": [...],
  "travelSummary": "..."
}

Ensure:
- There are exactly {days} items in the itinerary array
- Each day has realistic activities
- The dailyBudget reflects the {budget} level
- Food recommendations are local to {destination}
- All activities and tips align with eco-friendly practices
- The travelStyle influences the type of activities suggested
```

### Why Prompt 3 Gives the Best Results

| Factor | Explanation |
|--------|-------------|
| **Role Assignment** | "You are an expert eco-travel planner" primes Gemini to respond with authority and domain-specific knowledge. This reduces generic or irrelevant suggestions. |
| **Strict JSON Enforcement** | "Return ONLY a valid JSON object, no markdown, no code fences" dramatically reduces parsing failures. Without this, Gemini often wraps JSON in markdown code blocks (` ```json `). |
| **Exact Structure Template** | Providing the full JSON schema eliminates ambiguity. Gemini fills in values rather than inventing its own structure, guaranteeing the backend can parse the response. |
| **Explicit Constraints** | "There are exactly {days} items" prevents inconsistent array lengths. The backend validates this and returns a clear error if violated. |
| **Contextual Awareness** | Tying activities to budget level, destination, and travel style produces personalized results. A "luxury" trip to Paris gets different suggestions than a "budget" trip to Rishikesh. |
| **Eco-First Focus** | "All activities and tips align with eco-friendly practices" ensures the output matches EcoStay Connect's brand values. |
| **Backend Defensiveness** | Even with a perfect prompt, the backend still cleans markdown fences, attempts JSON repair via regex, and validates the response structure. This three-layer defense handles edge cases gracefully. |

---

## Performance Comparison

| Metric | Prompt 1 | Prompt 2 | Prompt 3 |
|--------|----------|----------|----------|
| Parseable JSON rate | ~10% | ~60% | ~95%+ |
| Correct number of days | Never | Sometimes | Always |
| Budget-aware suggestions | No | Partial | Yes |
| Eco-friendly content | Rare | Sometimes | Always |
| Production ready | ❌ | ❌ | ✅ |

---

## Prompt Engineering Principles Used

1. **Role prompting** — Assign a persona to the model
2. **Structured output** — Provide exact JSON schema
3. **Negative instructions** — "No markdown, no code fences"
4. **Constraints** — Enumerate exact requirements
5. **Context injection** — Pass all user inputs dynamically
6. **Defensive parsing** — Clean, repair, validate on the backend