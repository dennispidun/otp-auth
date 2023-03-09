import {createTestAccount, createTransport, Transporter} from "nodemailer";

class MailService {

    private transporter: Transporter;

    constructor() {
        this.transporter = createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

    }

    async sendCode(mail: string, code: string, finishLink: string) {
        await this.transporter.sendMail({
            from: '"Fachschaft Informatik" <pidunden@hu-berlin.de>',
            to: mail,
            subject: "Einmal-Passwort Altklausuren-Sammlung",
            text: `Hallo, 

                   Du erhältst diese E-Mail, weil Du dich für die Altklausuren-Sammlung angemeldet hast. 
                   
                   Bitte gehe auf: ${finishLink}
                   Passwort: ${code}
                   
                   Solltest Du kein Einmal-Passwort angefordert haben, kannst Du dich bei der Fachschaftsvertretung Informatik melden.
                   
                   Viele Grüße,
                   
                   Deine Fachschaftsvertretung Informatik 💻`.trim().replace(/[^\S\r\n]{2,}/g, ""),
        });
    }

}

export default new MailService();