import { model } from "@/utils/ai";
import { useEffect, useState } from "react";

export default function AIQuestions() {
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState("");

    const [history, setHistory] = useState([]);

    async function sendPrompt() {
        const result = await model.generateContent(prompt);
        const answerText = result.response.text();
        setAnswer(answerText);

        const newHistory = [...history];
        newHistory.push({ prompt, answer: answerText });
        setHistory(newHistory);
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("history"));

        setHistory(data);
    }, []);

    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem("history", JSON.stringify(history));
        }
    }, [history]);

    return (
        <div>
            <h2>AI Questions</h2>

            <input
                className="border border-gray-500"
                type="text"
                onChange={(e) => setPrompt(e.target.value)}
            />

            <button onClick={sendPrompt}>Send</button>

            <p>{answer}</p>
        </div>
    );
}