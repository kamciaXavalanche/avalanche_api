("use strict");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

    console.log("payment intend", paymentIntent.client_secret);
    ctx.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
}));
