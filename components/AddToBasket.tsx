"use client";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

type AddToBasketProps = {
  productID: string;
};

export default function AddToBasket({ productID }: AddToBasketProps) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const updateBasket = () => {
    const basket = JSON.parse(localStorage.getItem("basket") || "{}");

    basket[productID] = quantity;
    localStorage.setItem("basket", JSON.stringify(basket));
  };

  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" size="icon" onClick={decrementQuantity}>
        <Minus className="h-4 w-4" />
      </Button>
      <span className="text-xl font-semibold">{quantity}</span>
      <Button variant="outline" size="icon" onClick={incrementQuantity}>
        <Plus className="h-4 w-4" />
      </Button>
      <Button className="flex-1" onClick={updateBasket}>
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Basket
      </Button>
    </div>
  );
}
