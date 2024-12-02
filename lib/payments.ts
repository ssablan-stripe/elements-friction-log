"use server";

import { db } from "@/db";

type ItemMap = {
  [key: string]: number;
}

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function calculateOrderAmount({ items }: { items: ItemMap }): number {
  let total = 0;

  for (let key in items) {
    const itemPrice = db.products.find((item) => item.id === parseInt(key))?.price || 0;
    const itemQuantity = items[key]
    total += itemPrice * itemQuantity;
  }

  return total;
}

export async function createPaymentIntent({
  items,
}: {
  items: ItemMap;
}): Promise<{ clientSecret: string } | void> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount({ items }),
      currency: "usd",
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error("PAYMENT INTENT ERROR", error);
  }
}
