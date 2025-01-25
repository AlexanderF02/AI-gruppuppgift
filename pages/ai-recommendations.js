import { model } from "@/utils/ai";
import { useState } from "react";

const startPrompt = "Suggest 6 unique movie recommendations in this genre:  ";
const endPrompt = "Give me the answer as a json including title, year of release and a short summary. Don't include the year in the title";

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
    <div className="min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold mt-32 mb-8">Movie recommendations</h1>
        <h2 className="text-xl font-medium mb-8">Pick a genre and get movie suggestions in that genre</h2>
        <select className="select select-bordered select-sm w-full max-w-xs mb-8" defaultValue={""} onChange={(e) => sendPrompt(e.target.value)}>
          <option value={""} disabled>Select a movie genre</option>
          <option value={"Comedy"}>Comedy</option>
          <option value={"Drama"}>Drama</option>
          <option value={"Fantasy"}>Fantasy</option>
          <option value={"Horror"}>Horror</option>
          <option value={"Thriller"}>Thriller</option>
          <option value={"Science fiction"}>Science fiction</option>
        </select>
      </div>
      <div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {movies.map((movie, index) => (
            <div key={index} className="w-80 p-10">
              <p className="font-semibold mb-2">{movie.title} ({movie.year})</p>
              <p className="text-sm">{movie.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
