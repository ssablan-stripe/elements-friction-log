export type Bread = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};

const bread: Bread[] = [
  {
    id: 0,
    name: "Original Sourdough Loaf",
    description: "Our classic sourdough bread",
    image: "/original.png",
    price: 1000,
  },
  {
    id: 1,
    name: "Rosemary Sourdough Loaf",
    description: "We put some rosemary in it.",
    image: "/rosemary.png",
    price: 1300,
  },
  {
    id: 2,
    name: "Super Sourdough Pizza Crust",
    description: "Don't even lie, you're drooling right now.",
    image: "/pizza.png",
    price: 1500,
  },
];

export const db = {
  products: [...bread],
};
