import Link from "next/link";

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <Link className="btn btn-ghost text-xl" href="/">
        Home
      </Link>
      <Link className="btn btn-ghost text-xl" href="/chatbot">
        Chatbot
      </Link>
      <Link className="btn btn-ghost text-xl" href="/imageAI">
        Imgage recognition
      </Link>
      <Link className="btn btn-ghost text-xl" href="/ai-recommendations">
        AI recommendations
      </Link>
    </div>
  );
}
