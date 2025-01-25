import { useState } from "react";
import { model } from "@/utils/ai";

export default function Home() {
  const [src, setSrc] = useState("");
  const [finalResponse, setFinalResponse] = useState("");
  const [jsData, setData] = useState([]);

  async function imageResponse(src) {
    const response = await fetch(src);
    const buffer = await response.arrayBuffer();
    return buffer;
  }

  function getPlaceholderImg(s) {
    if (s === "") {
      return "./Gemini-logo.png";
    } else {
      return s;
    }
  }

  function Details({ data }) {
    return (
      <div>
        <h2 className="text-xl font-bold">Details</h2>
        <ul className="list-disc pl-5">
          {data.map((item, index) => (
            <li key={index} className="mb-1">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
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
        "List five things you see using only a JSON list",
      ]);

      const textResponse = await r.response.text();
      setFinalResponse(textResponse);
      console.log(textResponse);
      let JSONresponse = textResponse
        .replace("```json", "")
        .replace("```", "")
        .trim();
      console.log(JSONresponse);
      const parsedData = JSON.parse(JSONresponse);
      setData(parsedData);
    } catch (error) {
      console.error("Error generating content:", error);
      setFinalResponse("Error processing the image.");
    }
  }

  return (
    <div className="flex flex-col justify-center mt-8 items-center overflow-hidden px-4 ">
      <p className="text-neutral">
        Enter the url of a image and the AI will tell you what it sees!
      </p>
      <label htmlFor="imageSrc" className="ml-5 mt-4 text-neutral">
        Image URL:
      </label>
      <input
        id="imageSrc"
        value={src}
        type="text"
        placeholder="Type here"
        className="input bg-primary text-accent-content input-md w-full max-w-xs rounded-full placeholder-accent-content"
        onChange={(e) => setSrc(e.target.value)}
      />
      <button className="btn btn-accent mt-2 rounded-full" onClick={result}>
        Click here!
      </button>
      <div className="card lg:card-side w-full shadow-xl justify-start bg-primary text-primary-content mt-2">
        <figure className="w-full lg:w-1/3">
          <img
            src={getPlaceholderImg(src)}
            alt="Gemini logo/User inputed image"
            className="w-[400px] h-[400px] object-contain"
          />
        </figure>
        <div className="card-body w-full lg:w-2/3">
          <h2 className="card-title text-primary-content">AI output</h2>
          <div className="text-primary-content">
            {finalResponse === "Error processing the image." ? (
              <p>{finalResponse}</p>
            ) : (
              <Details data={jsData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
