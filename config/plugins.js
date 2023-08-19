module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.mail.me.com",
        port: 587,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
        secure: false,
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "sklep@levarde.com",
        defaultReplyTo: "sklep@levarde.com",
      },
    },
  },
  upload: {
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
});
