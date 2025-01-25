import Link from "next/link";

export default function () {
  return (
    <>
      <footer className="footer relative bottom-0 bg-neutral text-neutral-content p-10">
        <nav>
          <h6 className="footer-title font-display">Services</h6>
          <Link href="/chatbot" className="link link-hover font-sans">
            Chatbot
          </Link>
          <Link
            href="/ai-recommendations"
            className="link link-hover font-sans"
          >
            Movie recommendations
          </Link>
          <Link href="/imageAI" className="link link-hover font-sans">
            Image AI
          </Link>
          <Link href="/lady-content-ai" className="link link-hover font-sans">
            Lady Content
          </Link>
          <Link href="/" className="link link-hover font-sans">
            Lady Game
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title font-display">Company</h6>
          <a className="link link-hover font-sans">About us</a>
          <a className="link link-hover font-sans">Contact</a>
          <a className="link link-hover font-sans">Jobs</a>
          <a className="link link-hover font-sans">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title font-display">Legal</h6>
          <a className="link link-hover font-sans">Terms of use</a>
          <a className="link link-hover font-sans">Privacy policy</a>
          <a className="link link-hove font-sans">Cookie policy</a>
        </nav>
      </footer>
    </>
  );
}
