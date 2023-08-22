module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi
        .plugin("email")
        .service("email")
        .send({
          to: result.emailUser,
          from: "sklep@levarde.com",
          subject: "KOD RABATOWY",
          text: "KOD RABATOWY",
          html: `
            <h4>Dziękujemy za zapisanie do newslettera!</h4>
            <p>Oto kod rabatowy: LATO23</p>
          `,
        });

      console.log("E-mail sent successfully with discount code");
      console.log(result);
    } catch (err) {
      console.error("Error sending e-mail:", err);
    }
  },
};
