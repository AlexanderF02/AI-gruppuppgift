import { useState } from "react";

export default function Home() {
  const [src, setSrc] = useState("");
  return (
    <div>
      <label htmlFor="imageSrc"></label>
      <input
        id="imageSrc"
        value={src}
        type="text"
        placeholder="Type here"
        className="input w-full max-w-xs"
        onChange={(e) => setSrc(e.target.value)}
      />
      <p>{src}</p>
    </div>
  );
}
