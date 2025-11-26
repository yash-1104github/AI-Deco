"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function BuyCredits() {
  const creditsOption = [
    {
      credits: 10,
      amount: 0.05,
    },
    {
      credits: 25,
      amount: 0.5,
    },
    {
      credits: 50,
      amount: 1,
    },
  ];

  const [selectedOption, setSelectedOption] = useState([]);

  return (
    <div className="container mx-auto ">
      <h2 className="font-bold mt-10 text-2xl">Buy More Credits</h2>
      <p>
        Unlock endless possibilities – Buy more credits and transform your room
        with AI magic! ✨🛋️
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 py-10 gap-6 ">
        {creditsOption.map((item, index) => (
          <Card
            className={`flex flex-col justify-center items-center
                        ${
                          selectedOption?.credits == item.credits &&
                          "border-primary"
                        }`}
          >
            <CardHeader>
              <CardTitle className="flex font-bold text-3xl justify-center items-center">
                {item.credits}{" "}
                <span className="font-medium text-2xl p-3">Credits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-[100px]"
                onClick={() => setSelectedOption(item)}
              >
                Select
              </Button>
            </CardContent>
            <CardFooter>
              <h2 className="font-semibold text-xl text-primary">
                $ {item.amount}
              </h2>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="pt-10">
        {selectedOption?.amount && (
          <PayPalButtons
            style={{ layout: "horizontal" }}
            onApprove={() => onPaymentSuccess()}
            onCancel={() => console.log("Payment Cancel")}
            createOrder={(data, actions) => {
              return actions?.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedOption?.amount?.toFixed(2),
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        )}
      </div>
    </div>
  );
}

export default BuyCredits;
