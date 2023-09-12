let nodemailer = require('nodemailer');
const handlebars = require('handlebars')
const fs = require('fs');
const path = require("path");

module.exports = class Mailer {

    transporter = nodemailer.createTransport({
        host: process.env.SMTP_server,
        port: process.env.SMTP_port,
        secure: true,
        tls: {
            rejectUnauthorized: false
        },
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    async send(mailOptions) {
        try {
            let info = await this.transporter.sendMail(mailOptions);
            return { response: { message: "Email sent sucessfully", info: info } };
        } catch (err) {
            console.log("TCL: Mailer -> send -> err", err)
            throw new Error('Something went wrong while trying to sent email!');
        }
    }

    async buildTemplate(templateName, replacements) {
        const html = await fs.readFileSync(path.join(__dirname, "../public/email/" + templateName), 'utf-8');
        const template = await handlebars.compile(html);

        return await template(replacements);
    }
}
