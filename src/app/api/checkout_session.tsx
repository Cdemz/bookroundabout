import { NextApiRequest, NextApiResponse } from "next";
import stripe from "stripe";

type YourItemType = {
  name: string;
  img: string;
  price: number;
  quantity: number;
  // Add other properties as needed
};

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const items: YourItemType[] = req.body.cartItem;

    const origin = req.headers.origin || ""; // Use an empty string if origin is undefined

    const transformedItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [origin + item.img],
        },
        unit_amount: item.price * 100, // Amount in cents
      },
      quantity: item.quantity,
    }));

    try {
      // Create Checkout Sessions from body params.
      const session = await stripeClient.checkout.sessions.create({
        line_items: transformedItems,
        mode: "payment",
        success_url: `${origin}/success`,
        cancel_url: `${origin}/`,
      });

      res.json({ sessionURL: session.url });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "An error occurred while creating the checkout session.",
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
