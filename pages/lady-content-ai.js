import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function LadyContentAI() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are a Lady of the night. Your name is Lady Content.",
  });

  const [prompt, setPrompt] = useState([]);
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);

  async function sendPrompt() {
    const result = await model.generateContent(prompt);
    const answerText = result.response.text();
    setAnswer(answerText);
    const newHistory = [...history];
    newHistory.push({ prompt, answer });
    setHistory(newHistory);
  }

  async function sendOnPageLoad(question) {
    const result = await model.generateContent(question);
    setAnswer(result.response.text());
  }

  useEffect(() => {
    sendOnPageLoad(
      "Can you generate content for me? Please act as if I did not ask, you are just offering your assistance as a service."
    );
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("history", JSON.stringify(history));
    }
  }, [history]);

  return (
    <>
      <div
        id="mainContainer"
        className="flex flex-col justify-center items-center w-screen min-h-screen"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
          Ask <span className="text-[oklch(var(--p))]">Lady Content</span> for
          content
        </h1>

        <div
          id="contentContainer"
          className="flex flex-row gap-2 justify-center items-start pt-2 px-8 mb-4 w-full lg:px-80"
        >
          <div className="avatar placeholder">
            <div className="bg-secondary text-secondary-content w-12 rounded-full">
              <span className="font-display">LC</span>
            </div>
          </div>

          <div
            id="answerBox"
            className="flex flex-row bg-secondary rounded-lg p-4"
          >
            <p className="text-secondary-content">{answer}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center p-8 w-full">
          <div className="flex flex-col gap-2 w-full lg:w-4/5">
            <div className="flex items-center w-full gap-2">
              <input
                className="input rounded-full input-bordered w-full"
                placeholder="Please treat the Lady as a Lady..."
                type="text"
                onChange={(e) => setPrompt(e.target.value)}
              />

              <button className="btn btn-accent" onClick={sendPrompt}>
                Send
              </button>
            </div>
            <div className="flex flex-row justify-between items-center gap-2 w-full flex-wrap">
              <div className="flex flex-row justify-end items-center gap-2">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mr-1.5">Blog</span>
                    <input
                      type="checkbox"
                      value="blog"
                      onChange={(e) => setPrompt(e.target.value)}
                      defaultUnchecked
                      className="checkbox"
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mr-1.5">Article</span>
                    <input
                      type="checkbox"
                      value="article"
                      onChange={(e) => setPrompt(e.target.value)}
                      defaultUnchecked
                      className="checkbox"
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mr-1.5">Email</span>
                    <input
                      type="checkbox"
                      value="email"
                      onChange={(e) => setPrompt(e.target.value)}
                      defaultUnchecked
                      className="checkbox"
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mr-1.5">Poem</span>
                    <input
                      type="checkbox"
                      value="poem"
                      onChange={(e) => setPrompt(e.target.value)}
                      defaultUnchecked
                      className="checkbox"
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mr-1.5">Compliment</span>
                    <input
                      type="checkbox"
                      value="compliment"
                      onChange={(e) => setPrompt(e.target.value)}
                      defaultUnchecked
                      className="checkbox"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
