import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div id="main" className="flex flex-col px-8">
      {" "}
      <div className="flex flex-col justify-center items-center gap-2 pb-8 px-8">
        <h1 className="text-4xl font-semibold">Treat her like a Lady...</h1>
        <p className="font-sans">
          Introducing our ultra modern and charismatic AI models. Designed to be
          different and nice
        </p>
      </div>
      <div className="carousel rounded-box mb-8 gap-x-4 pb-10">
        <div className="carousel-item">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <div className="aspect-[4/3] bg-primary h-full w-full"></div>
            </figure>
            <div className="card-body">
              <Link href="/chatbot">
                <h2 className="card-title mb-2">Lady Chat</h2>
                <p className="mb-4 font-sans">Chat with the Lady?</p>

                <button className="btn rounded-full btn-primary">Start</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <div className="aspect-[4/3] bg-secondary h-full w-full"></div>
            </figure>
            <div className="card-body">
              <Link href="/lady-filmfinder">
                <h2 className="card-title mb-2">Lady FilmFinder</h2>
                <p className="mb-4">The Lady Recommends...?</p>

                <button className="btn rounded-full btn-secondary">
                  Start
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <div className="aspect-[4/3] bg-accent h-full w-full"></div>
            </figure>
            <div className="card-body">
              <Link href="/imageAI">
                <h2 className="card-title mb-2">Lady Image</h2>
                <p className="mb-4">The Lady paints an image?</p>

                <button className="btn rounded-full btn-accent">Start</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <div className="aspect-[4/3] bg-warning h-full w-full"></div>
            </figure>

            <div className="card-body">
              <Link href="/lady-content-ai">
                <h2 className="card-title mb-2">Lady Content</h2>
                <p className="mb-4">The Lady provides content</p>

                <button className="btn rounded-full btn-warning">Start</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <div className="aspect-[4/3] bg-error h-full w-full"></div>
            </figure>
            <div className="card-body">
              <h2 className="card-title mb-2">Lady Game</h2>
              <p className="mb-4">The Lady wants you to play her game</p>

              <Link href="/game.js">
                <button className="btn btn-error rounded-full">Start</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
