import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </>
  );
}
