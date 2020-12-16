const nodemailer = require('nodemailer');

function generateOrderMail({ order, total }) {}

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'eleazar.hand79@ethereal.email',
    pass: '5BrcxEQA4ZzfTs7zRR',
  },
});

exports.handler = async (event, context) => {
  const info = await transporter.sendMail({
    from: 'Twagenes <twagenes@example.com>',
    to: 'orders@example.com',
    subject: 'New Order!',
    html: `<p>Your Tagine order is here!</p>`,
  });
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
