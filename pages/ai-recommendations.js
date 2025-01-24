import { model } from "@/utils/ai";
import { useState } from "react";

const startPrompt = "Suggest 5 unique movie recommendations in this genre:  ";
const endPrompt = "Give me the answer as a json including title, year of release and a short summary.";

export default function AiRecommendations() {
    const [movies, setMovies] = useState([]);

    async function sendPrompt(genre) {
        const prompt = startPrompt + genre + endPrompt;
        const result = await model.generateContent(prompt);
        const answerText = result.response.text();
        const cleanedText = answerText
            .replace("```json", "")
            .replace("```", "")
            .trim();
        const parsedMovies = JSON.parse(cleanedText);
        setMovies(parsedMovies);
    }

    return (
        <div>
            <h1 className="ml-12 text-2xl font-bold mb-4">Get movie recommendations</h1>
            <select className="select select-bordered select-sm w-full max-w-xs ml-12 mb-8" defaultValue={""} onChange={(e) => sendPrompt(e.target.value)}>
                <option value={""} disabled>Select a movie genre</option>
                <option value={"Comedy"}>Comedy</option>
                <option value={"Drama"}>Drama</option>
                <option value={"Fantasy"}>Fantasy</option>
                <option value={"Horror"}>Horror</option>
                <option value={"Thriller"}>Thriller</option>
                <option value={"Science fiction"}>Science fiction</option>
            </select>
            <div className="mx-12">
                <ul>
                    {movies.map((movie, index) => (
                        <li key={index} className="mb-7 w-80">
                            <p className="font-semibold mb-2">{movie.title} ({movie.year})</p>
                            <p className="text-sm">{movie.summary}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}