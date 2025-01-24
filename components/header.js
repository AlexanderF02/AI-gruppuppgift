import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Header() {
  return (
    <span className="fixed left-0 top-0 w-screen">
      <div className="flex items-center justify-between navbar px-8 pt-4 pb-4 bg-neutral">
        <div id="navContainer" classname="flex items-center">
          <Link className="btn btn-ghost text-neutral-content" href="/">
            Home
          </Link>
          <Link className="btn btn-ghost text-neutral-content" href="/chatbot">
            Chatbot
          </Link>
          <Link className="btn btn-ghost text-neutral-content" href="/imageAI">
            Imgage recognition
          </Link>
          <Link
            className="btn btn-ghost text-neutral-content"
            href="/ai-recommendations"
          >
            Recommendations
          </Link>
          <Link
            className="btn btn-ghost text-neutral-content"
            href="/lady-content-ai"
          >
            LadyContent AI
          </Link>
        </div>
        <DarkModeSwitch />
      </div>
    </span>
  );
}
