var easyinvoice = require("easyinvoice");

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    const entries = await strapi.db
      .query("api::invoice-number.invoice-number")
      .findMany({});

    // Pobierz aktualny numer faktury
    const currentInvoiceNumber = entries[0].invoiceNumber;

    // Zaktualizuj numer faktury i zwiększ o 1
    const newInvoiceNumber = currentInvoiceNumber + 1;

    // Aktualizacja numeru faktury w bazie danych
    await strapi.db.query("api::invoice-number.invoice-number").update({
      where: { id: entries[0].id }, // Może być inny warunek identyfikujący rekord
      data: { invoiceNumber: newInvoiceNumber },
    });

    console.log("Nowy numer faktury", newInvoiceNumber);

    const easyInvoiceProducts = result.products.map((product) => ({
      quantity: product.quantity,
      description: `${product.slug
        .replace(/-/g, " ")
        .charAt(0)
        .toUpperCase()}${product.slug.replace(/-/g, " ").slice(1)} ${
        product.size
      }`,
      "tax-rate": 0,
      price: parseFloat(product.price.replace(" zł", "").replace(",", ".")),
    }));

    const dateObject = new Date(result.createdAt);
    const formattedDate = dateObject.toISOString().split("T")[0];
    const [year, month] = formattedDate.split("-");

    const newDateObject = new Date(dateObject);
    newDateObject.setDate(dateObject.getDate() + 7);
    const newFormattedDate = newDateObject.toISOString().split("T")[0];

    const invoiceNumber = `FA/${newInvoiceNumber}/${month}/${year}`;

    var data = {
      // Customize enables you to provide your own templates
      // Please review the documentation for instructions and examples
      customize: {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
      },
      images: {
        // The logo on top of your invoice
        logo: "https://res.cloudinary.com/dmszph456/image/upload/v1693669725/logo_1_b3f250aceb_1_817b22c889.png",
        // The invoice background
        background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
      },
      // Your own data
      sender: {
        company: "Sklep Levarde",
        address: "Podhalańska 20/16",
        zip: "34-400",
        city: "Nowy Targ",
        country: "Polska",
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      // Your recipient
      client: {
        company: `${result.customerData[0].firstname} ${result.customerData[0].secondname}`,
        address: `${result.customerData[0].address}`,
        zip: `${result.customerData[0].postcode}`,
        city: `${result.customerData[0].city}`,
        country: `${result.customerData[0].country}`,
        // "custom1": "custom value 1",
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
      },
      information: {
        // Invoice number
        number: invoiceNumber,
        // Invoice data
        date: formattedDate,
        // Invoice due date
        "due-date": newFormattedDate,
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      products: easyInvoiceProducts,
      // The message you would like to display on the bottom of your invoice
      "bottom-notice":
        "Dziękujemy za zakupy w naszym sklepie. Ceny zawierają już VAT.",
      // Settings to customize your invoice
      settings: {
        currency: "PLN", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
      },
      // Translate your invoice to your preferred language
      translate: {
        invoice: "Faktura zakupu", // Default to 'INVOICE'
        number: "Numer", // Defaults to 'Number'
        date: "Data", // Default to 'Date'
        "due-date": "Termin zapłaty", // Defaults to 'Due Date'
        subtotal: "Podsumowanie", // Defaults to 'Subtotal'
        products: "Produkty", // Defaults to 'Products'
        quantity: "Ilość", // Default to 'Quantity'
        price: "Cena", // Defaults to 'Price'
        "product-total": "Łącznie", // Defaults to 'Total'
        total: "Całość", // Defaults to 'Total'
        vat: "", // Defaults to 'vat'
      },
    };
    //Create your invoice! Easy!
    easyinvoice.createInvoice(data, async function (essa) {
      //The response will contain a base64 encoded PDF file

      try {
        if (result.orderStatus === "successful") {
          await strapi
            .plugin("email")
            .service("email")
            .send({
              to: result.customerData[0].email,
              from: "sklep@levarde.com",
              subject: "Potwierdzenie zamówienia",
              text: "Potwierdzenie zamówienia",
              html: `<h4>Dziękujemy za zakupy w naszym sklepie ${result.customerData[0].firstname}!</h4>`,
              attachments: [
                {
                  filename: "faktura.pdf",
                  content: Buffer.from(essa.pdf, "base64"),
                  contentType: "application/pdf",
                },
              ],
            });
        }
        await strapi
          .plugin("email")
          .service("email")
          .send({
            to: "konr.jankowski@gmail.com",
            from: "sklep@levarde.com",
            subject: "Nowe zamówienie",
            text: "Ktoś złożył zamówienie",
            html: `<h4>Nowe zamówienie zostało złożone.</h4>
           <p>Kliknij <a href="https://avalanche-l8v0.onrender.com/admin/content-manager">tutaj</a>, aby przejść do panelu admina.</p>`,
            attachments: [
              {
                filename: "faktura.pdf",
                content: Buffer.from(essa.pdf, "base64"),
                contentType: "application/pdf",
              },
            ],
          });
      } catch (err) {
        console.error("Error sending e-mail:", err);
      }
    });
  },
};
