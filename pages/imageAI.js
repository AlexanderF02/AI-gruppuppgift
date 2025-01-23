import { useState } from "react";
import { model } from "@/utils/ai";

export default function Home() {
  const [src, setSrc] = useState("");
  const [finalResponse, setFinalResponse] = useState("");

  async function imageResponse(src) {
    const response = await fetch(src);
    const buffer = await response.arrayBuffer();
    return buffer;
  }

  async function result() {
    try {
      const imgResponse = await imageResponse(src);

      const r = await model.generateContent([
        {
          inlineData: {
            data: Buffer.from(imgResponse).toString("base64"),
            mimeType: "image/jpeg",
          },
        },
        "what is in this image",
      ]);

      const textResponse = await r.response.text();
      setFinalResponse(textResponse);
    } catch (error) {
      console.error("Error generating content:", error);
      setFinalResponse("Error processing the image.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center overflow-hidden px-4">
      <label htmlFor="imageSrc" className="ml-5">
        Image URL:
      </label>
      <input
        id="imageSrc"
        value={src}
        type="text"
        placeholder="Type here"
        className="input w-full max-w-xs"
        onChange={(e) => setSrc(e.target.value)}
      />
      <button className="btn btn-primary mt-4" onClick={result}>
        Click here!
      </button>
      <div className="card bg-base-100 shadow-xl w-full max-w-lg flex flex-col mt-4">
        <figure className="h-1/2 w-full flex justify-center items-center overflow-hidden">
          <img
            src={src}
            alt="User inputted image"
            className="max-h-full max-w-full object-contain"
          />
        </figure>
        <div className="card-body flex-1 overflow-auto">
          <h2 className="card-title">AI output</h2>
          <p className="whitespace-pre-line break-words">{finalResponse}</p>
        </div>
      </div>
    </div>
  );
}
