import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import AddToBasket from "@/components/AddToBasket";
import Header from "@/components/Header";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const product = db.products.find((product) => product.id === parseInt(id))!;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product?.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  (128 reviews)
                </span>
              </div>
            </div>
            <p className="text-xl font-semibold">$6.99</p>
            <p className="text-gray-600">
              Our signature sourdough bread is crafted with care using a
              generations-old starter and the finest organic flour. Each loaf is
              fermented for 24 hours, resulting in a perfect balance of tangy
              flavor and chewy texture.
            </p>
            <div className="flex space-x-2">
              <Badge>Organic</Badge>
              <Badge>Non-GMO</Badge>
              <Badge>Vegan</Badge>
            </div>
            <AddToBasket productID={id} />
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  Nutritional Information
                </h2>
                <ul className="space-y-1 text-sm">
                  <li>Serving Size: 1 slice (50g)</li>
                  <li>Calories: 130</li>
                  <li>Total Fat: 0.5g</li>
                  <li>Carbohydrates: 27g</li>
                  <li>Protein: 4g</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
