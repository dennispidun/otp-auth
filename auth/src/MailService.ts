import {createTestAccount, createTransport, Transporter} from "nodemailer";
import ClientsService from "./ClientsService";

class MailService {

    private transporter: Transporter;

    constructor() {
        const port = Number.parseInt(process.env.MAIL_PORT) || 587
        this.transporter = createTransport({
            host: process.env.MAIL_HOST,
            port,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

    }

    async sendCode(clientId: string, mail: string, code: string, finishLink: string) {
        const client = ClientsService.getClient(clientId);
        await this.transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: mail,
            subject: `OTP for ${client.text.applicationName}`,
            text: `Hello, 

                   This mail contains the one-time-password for the following application:

                   ${client.text.applicationName} by ${client.text.orgName}
                   
                   Click here to activate: ${finishLink}
                   Password: ${code}
                   
                   If you have not requested a one-time password, you can contact ${client.text.orgName}.
                   
                   Yours sincerely,
                   
                   ${client.text.orgName}`.trim().replace(/[^\S\r\n]{2,}/g, ""),
        });
    }

}

export default new MailService();