"use client";

import {
  AddressElement,
  ExpressCheckoutElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeAddressElementOptions, StripeError, StripeExpressCheckoutElementConfirmEvent, StripeExpressCheckoutElementOptions, StripePaymentElementOptions } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { createPaymentIntent } from "@/lib/payments";
import { getItemMap } from "@/lib/utils";

const GENERIC_ERROR = "An unexpected error occurred.";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleError = (error: StripeError) => {
    setLoading(false);
    setMessage(error.message || null);
  };

  const handleSubmit = async (e: FormEvent | StripeExpressCheckoutElementConfirmEvent) => {
    if (e instanceof FormDataEvent) {
      console.log("FORM DATA EVENT")
      e.preventDefault();
    }

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    try {
      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }

      const paymentIntent = await createPaymentIntent({ items: getItemMap() });

      if (!paymentIntent) {
        throw new Error("PAYMENT INTENT FAILED");
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: paymentIntent.clientSecret,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/complete",
        },
      });

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || GENERIC_ERROR);
      } else {
        setMessage(GENERIC_ERROR);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const addressElementOptions: StripeAddressElementOptions = {
    mode: "shipping"
  }
  const expressCheckoutElementOptions: StripeExpressCheckoutElementOptions = {
    paymentMethods: {
      applePay: "always"
    }
  }
  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 w-full"
        id="payment-form"
        onSubmit={handleSubmit}
      >
        <LinkAuthenticationElement />
        <AddressElement options={addressElementOptions}/>
        <ExpressCheckoutElement onConfirm={handleSubmit}/>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Button
          className="max-w-64"
          disabled={loading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {loading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </Button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
