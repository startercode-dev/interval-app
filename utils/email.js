const sgMail = require('@sendgrid/mail');

const sendEmail = async (options) => {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: options.email,
            from: 'no-reply@startercode.dev',
            subject: options.subject,
            html: options.html,
        };

        await sgMail.send(msg);
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendEmail;
