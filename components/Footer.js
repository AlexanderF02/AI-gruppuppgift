import Link from "next/link";

export default function () {
  return (
    <>
      <footer className="footer relative bottom-0 bg-neutral text-neutral-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link href="/chatbot" className="link link-hover">
            Lady Chat
          </Link>
          <Link href="/imageAI" className="link link-hover">
            Lady Image 
          </Link>
          <Link href="/lady-content-ai" className="link link-hover">
            Lady Content
          </Link>
          <Link href="/lady-filmfinder" className="link link-hover">
            Lady FilmFinder
          </Link>
          <Link href="/game" className="link link-hover">
            Lady Game
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </>
  );
}
