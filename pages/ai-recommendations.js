import { model } from "@/utils/ai";
import { useState } from "react";

export default function AIQuestions() {
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState("");

    async function sendPrompt() {
        const result = await model.generateContent(prompt);
        const answerText = result.response.text();
        setAnswer(answerText);
    }

    return (
        <div>
            <h2 className="pl-6">AI recommendations</h2>

            <input
                className="pl-6 border border-gray-500"
                type="text"
                onChange={(e) => setPrompt(e.target.value)}
            />

            <button onClick={sendPrompt}>Send</button>

            <p>{answer}</p>
        </div>
    );
}