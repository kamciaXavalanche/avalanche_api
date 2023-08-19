module.exports = {
  async afterCreate(event) {
    // Data that is created is contained in the result object
    // Customize your HTML with the data accordingly.

    // {
    //   id: 26,
    //   totalPrice: 349.99,
    //   products: [
    //     {
    //       size: 'L',
    //       slug: 'dress-elegant-genome',
    //       uuid: '2fc9e456-3ddb-4e21-9e5c-9f48bfd3f08c',
    //       color: 'White',
    //       quantity: 1
    //     }
    //   ],
    //   createdAt: '2023-08-14T19:39:38.957Z',
    //   updatedAt: '2023-08-14T19:39:38.957Z',
    //   publishedAt: '2023-08-14T19:39:38.954Z',
    //   customerData: [
    //     {
    //       email: 'asfasfsafas',
    //       address: 'afsas',
    //       country: 'sfasfsaf',
    //       firstname: 'asf',
    //       secondname: 'asfasf',
    //       postcode: 'asf',
    //       city: 'asf',
    //       number: 'asfasfasf'
    //     }
    //   ]
    // }
    const { result } = event;

    console.log(result);

    try {
      await strapi
        .plugin("email")
        .service("email")
        .send({
          to: result.customerData[0].email,
          from: "sklep@levarde.com",
          subject: "Potwierdzenie zamówienia",
          text: "Potwierdzenie zamówienia",
          html: `<h4>Order successfully created! Thank you, ${result.customerData[0].firstname}! You ordered ${result.products[0].slug}</h4>`,
        });
      await strapi.plugin("email").service("email").send({
        to: "sklep@levarde.com",
        from: "sklep@levarde.com",
        subject: "Nowe zamówienie",
        text: "Nowe zamówienie zostało złożone.",
        html: `<h4>Nowe zamówienie zostało złożone.</h4>`,
      });
    } catch (err) {}
  },
};
