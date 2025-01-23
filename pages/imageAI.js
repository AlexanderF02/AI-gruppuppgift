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

  function getPlaceholderImg(s) {
    if (s == "") {
      return "./Gemini-logo.png";
    } else {
      return s;
    }
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
        "what is in this image, answer with a list of items",
      ]);

      const textResponse = await r.response.text();
      setFinalResponse(textResponse);
    } catch (error) {
      console.error("Error generating content:", error);
      setFinalResponse("Error processing the image.");
    }
  }

  return (
    <div className=" flex flex-col justify-center items-center overflow-hidden px-4">
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
      <div class="card lg:card-side bg-base-100 shadow-xl justify-start">
        <figure class="w-full lg:w-1/3">
          <img
            src={getPlaceholderImg(src)}
            alt="Gemini logo/User inputed image"
            class="w-full h-full object-cover"
          />
        </figure>
        <div class="card-body w-full lg:w-2/3">
          <h2 class="card-title">AI output</h2>
          <p>{finalResponse}</p>
        </div>
      </div>
    </div>
  );
}
