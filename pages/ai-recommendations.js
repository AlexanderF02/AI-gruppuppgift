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
            <h2 className="ml-6 font-bold">AI recommendations</h2>

            <input
                className="ml-6 border border-gray-500"
                type="text"
                onChange={(e) => setPrompt(e.target.value)}
            />

            <button onClick={sendPrompt}>Send</button>

            <p className="mx-6">{answer}</p>
        </div>
    );
}