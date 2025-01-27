import { model } from "@/utils/ai";
import { useState } from "react";

const startPrompt = "Suggest 6 unique movie recommendations in this genre:  ";
const endPrompt = "Give me the answer as a JSON including title, year of release and a summary (ca 50 words). Respond with JSON format only, without any additional text. Don't use quotation marks (single or double) in the summary. Don't include the year in the title.";

export default function LadyFilmFinder() {
  const [movies, setMovies] = useState([]);

  async function sendPrompt(genre) {
    const prompt = startPrompt + genre + endPrompt;
    const result = await model.generateContent(prompt);
    const answerText = result.response.text();
    console.log(answerText)
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
        <h1 className="text-2xl md:text-4xl font-bold mt-32 mb-8">Lady <span className="text-[oklch(var(--s))]">FilmFinder</span></h1>
        <h2 className="text-base md:text-xl px-4 font-medium mb-8 mx-4 text-center">Discover an exquisite selection of films, tailored to your chosen genre</h2>
        <select className="select select-bordered select-sm max-w-xs mb-8 dark:rounded-xl" defaultValue={""} onChange={(e) => sendPrompt(e.target.value)}>
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
        {movies.length ? <h2 className="text-center text-base md:text-lg mx-4 font-semibold mb-8">Here are your personally curated movie recommendations</h2> : <h2></h2>}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {movies.map((movie, index) => (
            <div key={index} className="w-80 p-10 border rounded-2xl">
              <p className="font-semibold mb-2">{movie.title} ({movie.year})</p>
              <p className="text-sm">{movie.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
