import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Header() {
  return (
    <span className="fixed left-0 top-0 w-screen">
      <div className="flex items-center justify-between navbar px-8 pt-4 pb-4 border-b-neutral border-b-2">
        <div id="navContainer" classname="flex items-center">
          <Link className="btn btn-ghost text-neutral" href="/">
            Home
          </Link>
          <Link className="btn btn-ghost text-neutral" href="/chatbot">
            Chatbot
          </Link>
          <Link className="btn btn-ghost text-neutralt" href="/imageAI">
            Imgage recognition
          </Link>
          <Link
            className="btn btn-ghost text-neutral"
            href="/ai-recommendations"
          >
            Recommendations
          </Link>
          <Link className="btn btn-ghost text-neutral" href="/lady-content-ai">
            LadyContent AI
          </Link>
        </div>
        <DarkModeSwitch />
      </div>
    </span>
  );
}
