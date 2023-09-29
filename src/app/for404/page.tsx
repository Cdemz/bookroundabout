// pages/404.js (or pages/404.tsx)
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="text-black text-4xl">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link href="/">
        <a>Go back to the homepage</a>
      </Link>
    </div>
  );
};

export default Custom404;
