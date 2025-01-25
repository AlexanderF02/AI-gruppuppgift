import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div id="main" className="flex flex-col pt-24 px-8">
      <div className="carousel rounded-box mb-8 gap-x-4">
        <div className="carousel-item"></div>
        <div className="carousel-item">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <Link href="/chatbot">
                <h2 className="card-title">Chatbot</h2>
                <p>Chat with the Lady?</p>

                <button className="btn btn-primary">Buy Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <Link href="/ai-recommendations">
                <h2 className="card-title">Recommendations!</h2>
                <p>The Lady Recommends...?</p>

                <button className="btn btn-primary">Buy Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <Link href="/imageAI">
                <h2 className="card-title">Image AI</h2>
                <p>The Lady paints an image?</p>

                <button className="btn btn-primary">Buy Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>

            <div className="card-body">
              <Link href="/lady-content-ai">
                <h2 className="card-title">Lady Content</h2>
                <p>The Lady provides content</p>

                <button className="btn btn-primary">Buy Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Lady Quiz</h2>
              <p>The Lady wants you to join her quiz</p>
              <div className="card-actions justify-end">
                <Link href="/">
                  <button className="btn btn-primary">Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start lg:items-center gap-2 py-6 px-4">
        <h1 className="text-3xl lg:text-4xl font-bold">
          Treat her like a Lady...
        </h1>
        <p className="text-xl">
          Introducing our ultra modern and charismatic AI models. Designed to be
          different and nice
        </p>
      </div>
    </div>
  );
}
