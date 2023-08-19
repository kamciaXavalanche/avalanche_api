module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi.plugin("email").service("email").send({
        to: result.emailUser,
        from: "sklep@levarde.com",
        subject: "KOD RABATOWY",
        text: "KOD RABATOWY",
        html: `<h4>Dziękujemy za zapisanie do newslettera! Oto kod rabatowy: LATO23</h4>`,
      });
      console.log("Success sending e-mail");
      console.log(result);
    } catch (err) {
      console.error("Error sending e-mail:", err);
    }
  },
};
