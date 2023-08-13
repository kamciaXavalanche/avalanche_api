module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        // service: "iCloud",
        host: env("SMTP_HOST", "smtp.example.com"),
        port: env("SMTP_PORT", 587),
        auth: {
          user: "sklep@levarde.com",
          pass: "Niewiem1223",
        },
        // ... any custom nodemailer options
      },
    },
    settings: {
      defaultFrom: "sklep@levarde.com",
      defaultReplyTo: "sklep@levarde.com ",
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
