("use strict");
const stripe = require("stripe")(
  "sk_test_51KsNPHD2JGtC3oa6rGcps0s4R3JtrgMLO1rZy9KRyWZbKXu2i4LvX06vurhoUj8q1IxVyzl2vNz0dLhgjn4g3gGa00bxFqE5YK"
);

const calculateOrderAmount = (total) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return total;
};

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { total } = ctx.request.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(total),
      currency: "pln",
      payment_method_types: ["card", "blik", "paypal", "p24"],
    });

    const orderData = {
      total,
      // other order data,
      paymentIntentId: paymentIntent.id, // Store the payment intent ID for future reference
    };

    const savedOrder = await strapi.query("order").create(orderData);

    console.log("payment intend", paymentIntent.client_secret);
    ctx.send({
      clientSecret: paymentIntent.client_secret,
      order: savedOrder,
    });
  },
}));
