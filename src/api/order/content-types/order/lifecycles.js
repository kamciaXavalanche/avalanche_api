module.export = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi.plugins["email"].services.email.send({
        to: "agnieszka.filipiec11@gmail.com",
        from: "konr.jankowski@gmail.com",
        subject: "Hello TESTUJEMY",
        text: `Your todo is: ${result.amount}`,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
