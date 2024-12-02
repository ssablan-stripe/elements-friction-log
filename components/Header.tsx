import { Wheat } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <Wheat className="h-6 w-6 mr-2" />
        <span className="font-bold">Spencer's Sourdough</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/#products"
        >
          Our Breads
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/#about"
        >
          About Us
        </Link>
        <Link href="/checkout">
          <Button variant="outline">Checkout</Button>
        </Link>
      </nav>
    </header>
  );
}
