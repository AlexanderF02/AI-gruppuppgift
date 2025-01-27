




export default async function handler(req, res) {
    if (req.method === "POST") {
      const { country } = req.body;
  
      if (!country) {
        return res.status(400).json({ error: "Country is required" });
      }
  
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Generate a quiz question about ${country}. Provide the correct answer and ensure two incorrect but possible answers.`,
                    },
                  ],
                },
              ],
            }),
          }
        );
  
        const data = await response.json();
        
  
        if (!data || !data.candidates || !data.candidates[0].content.parts[0].text) {
          console.error("Unexpected API response:", data);
          throw new Error("Failed to generate question from Gemini API");
        }
  
        const content = data.candidates[0].content.parts[0].text;
  
        const [question, correctAnswer, ...incorrectAnswers] = content.split("\n").filter(Boolean);
  
        if (!question || !correctAnswer || incorrectAnswers.length < 2) {
          throw new Error("Not complete response from the api");
        }
  
        // Slumpar ordning på alternativ så att det inte alltid är rätt på tex första
        const options = [correctAnswer, ...incorrectAnswers.slice(0, 2)].sort(() => Math.random() - 0.5);
  
        res.status(200).json({
          question,
          options,
          correctAnswer, // Denna del kontrollerar om användarens del är rätt
        });
      } catch (error) {
        console.error("Error getting the question from the api:", error);
        res.status(500).json({ error: "Failed." });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  