import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { model } from "@/utils/ai";
import { CopyIcon } from "@radix-ui/react-icons";

export default function LadyContentAI() {
  const [prompt, setPrompt] = useState([]);
  const [textPrompt, setTextPromt] = useState("");
  const [answer, setAnswer] = useState("");
  async function sendPrompt() {
    const promptResult = await model.generateContent(prompt);
    const textResult = await model.generateContent(textPrompt);
    const answerText = textResult.response.text();
    const answerPrompt = promptResult.response.text();
    const fullAnswer = answerText + answerPrompt;
    setAnswer(fullAnswer);
  }

  async function sendOnPageLoad(question) {
    const result = await model.generateContent(question);
    setAnswer(result.response.text());
  }

  useEffect(() => {
    sendOnPageLoad(
      "Introduce yourself to the user as Lady Content. Explain that you primarely are a diva and secondary a Content generator that generates blog posts, articles, emails or poems. Also please do not use *"
    );
  }, []);

  // useEffect(() => {
  //   if (history.length > 0) {
  //     localStorage.setItem("history", JSON.stringify(history));
  //   }
  // }, [history]);

  const copy = useRouter();
  const base = answer;
  const copyBase = (e) => {
    navigator.clipboard.writeText(base);
  };

  return (
    <>
      <div
        id="mainContainer"
        className="flex flex-col justify-center items-center w-screen min-h-screen"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
          Ask <span className="text-[oklch(var(--s))]">Lady Content</span> for
          content
        </h1>

        <div
          id="contentContainer"
          className="chat chat-start flex flex-row gap-2 justify-center items-start pt-2 px-8 mb-4 w-full lg:px-80"
        >
          <div className="chat-image avatar placeholder">
            <div className="bg-secondary text-secondary-content w-10 rounded-full">
              <span className="font-display">LC</span>
            </div>
          </div>

          <div
            id="answerBox"
            className="chat-bubble bg-secondary px-4 pt-4 pb-6"
          >
            <p className="text-secondary-content">{answer}</p>
          </div>
          <span className="flex justify-end items-end">
            <button
              onClick={copyBase}
              className="btn btn-sm btn-secondary-content rounded-full"
            >
              <CopyIcon />
            </button>
          </span>
        </div>

        <div className="flex flex-col justify-center items-center p-8 w-full">
          <div className="flex flex-col gap-2 w-full lg:w-4/5">
            <div className="flex items-center w-full gap-2">
              <input
                className="input rounded-full input-bordered w-full"
                placeholder="Be specific regarding the type of content you need and always treat the Lady as a Lady..."
                type="text"
                onChange={(e) => setTextPromt(e.target.value)}
              />

              <button
                className="btn btn-accent rounded-full"
                onClick={sendPrompt}
              >
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
