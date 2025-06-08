import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.GEMINI_KEY)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

 export const analyzeTicket = async (ticket) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

  const prompt = `
You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.

Analyze the following support ticket and provide a JSON object with:

- summary: A short 1-2 sentence summary of the issue.
- priority: One of "low", "medium", or "high".
- helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
- relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "MongoDB"]).

Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

{
  "summary": "Short summary of the ticket",
  "priority": "high",
  "helpfulNotes": "Here are useful tips...",
  "relatedSkills": ["React", "Node.js"]
}

---

Ticket information:

- Title: ${ticket.title}
- Description: ${ticket.description}
`;

  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    // Optional: Try to extract JSON from response if wrapped in code fences
    const jsonMatch = raw.match(/```json\s*([\s\S]*?)\s*```/) || raw.match(/```([\s\S]*?)```/);
    const jsonString = jsonMatch ? jsonMatch[1] : raw;
     
   // console.log(raw);
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Error analyzing ticket or parsing JSON:", e.message);
    return null;
  }
};


