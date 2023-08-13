module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.mail.me.com",
        port: 587,
        auth: {
          user: "kamcia_x@icloud.com",
          pass: "xoit-vail-vxqw-dsvb",
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "kamcia_x@icloud.com",
        defaultReplyTo: "kamcia_x@icloud.com",
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
