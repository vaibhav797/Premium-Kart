import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckOutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/orders/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// console.log(process.env.STRIPE_KEY);
const stripePromise = loadStripe(
  "pk_test_51NVIesSJZE9fasPtxQXI3Ybr1tw6Or5NijOPv4s81PkTsc466MQyfEDUofgx97h8ECWuMhsivF44ocvU0l0CCayr00yR5E16IE"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const curOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const payment = async () => {
      const res = await fetch("/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({
          totalPrice: curOrder.totalPrice,
          orderId: curOrder.id,
        }),
        headers: { "content-type": "application/json" },
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    payment();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
