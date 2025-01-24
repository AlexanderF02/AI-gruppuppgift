import Link from "next/link";

export default function () {
  return (
    <>
      <footer className="footer fixed bottom-0 bg-neutral text-neutral-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link href="/chatbot" className="link link-hover">
            Chatbot
          </Link>
          <Link href="/ai-recommendations" className="link link-hover">
            Recommentaions
          </Link>
          <Link href="/imageAI" className="link link-hover">
            Image AI
          </Link>
          <Link href="/lady-content-ai" className="link link-hover">
            Lady Content
          </Link>
          <Link href="/" className="link link-hover">
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
