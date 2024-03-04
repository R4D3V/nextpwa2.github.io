import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <span className="text-white text-xl font-bold">Your Logo</span>
        </Link>

        <div className="space-x-4">
          <Link href="/">
            <span className="text-white">Home</span>
          </Link>
          <Link href="/about">
            <span className="text-white">About</span>
          </Link>
          <Link href="/contact">
            <span className="text-white">Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
