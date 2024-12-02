"use client";

import { Elements } from "@stripe/react-stripe-js";
import {
  loadStripe,
  type Appearance,
  type Stripe,
  type StripeElementsOptions,
} from "@stripe/stripe-js";
import {  useState } from "react";
import CompletePage from "./CompletePage";
import CheckoutForm from "./CheckoutForm";


const appearance: Appearance = {
  theme: "flat"
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Stripe() {
  const [confirmed, setConfirmed] = useState(false);

  const options: StripeElementsOptions = {
    appearance,
    mode: "payment",
    amount: 1099,
    currency: 'usd',
  };

  return (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? <CompletePage /> : <CheckoutForm />}
        </Elements>
  );
}
