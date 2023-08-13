module.export = {
  async afterCreate() {
    try {
      await strapi.plugins["email"].services.email.send({
        to: "konr.jankowski@gmail.com",
        from: "sklep@levarde.com",
        subject: "KOD RABATOWY",
        text: `Dziękujemy za subskyrpcje kod rabatowy to LIPEC22`,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
