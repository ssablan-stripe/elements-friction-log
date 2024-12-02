import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { Wheat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your mom's favorite bread
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  She's been texting me all day about how good this bread is.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="#products">
                  <Button>Order Now</Button>
                </Link>
                <Link href="#about">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id="products"
          className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Breads
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {db.products.map((product) => {
                return (
                  <Card key={product.id}>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[200px] object-cover rounded-md"
                        width={300}
                        height={200}
                      />
                    </CardContent>
                    <CardFooter>
                      <Link className="w-full" href={`/breads/${product.id}`}>
                        <Button className="w-full">Gimme that bread</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        <section
          id="about"
          className="w-full flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Everything you need to know about us
          </h2>
          <span>We love good sourdough. </span>
          <span>We make good sourdough.</span>
          <span>We sell good sourdough.</span>
          <span>
            Also, we use Stripe for our payments, so give us your money.
          </span>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Spencer's Sourdough. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
