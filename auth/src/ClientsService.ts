import clients from './clients.json'

interface LoginTextConfiguration {
    infoText: string
    ctaText: string
    emailPlaceholder: string
}

interface FinishTextConfiguration {
    ctaText: string
    buttonText: string
}

interface ClientTextConfiguration {
    orgName: string
    applicationName: string
    login: LoginTextConfiguration
    finish: FinishTextConfiguration
}

interface EmailConfiguration {
    allowPattern?: string,
    blockedPattern?: string,
    allowedEmails?: string[],
    blockedEmails?: string[]
}

interface ClientConfiguration {
    id: string
    redirectUrls: string[]
    expireIn: number
    email?: EmailConfiguration
    text: ClientTextConfiguration
}

class ClientsService {
    getClient(id: string): ClientConfiguration | undefined {
        const clientConfig = (clients.clients as ClientConfiguration[]).find(c => c.id === id)

        if (!clientConfig) {
            return undefined;
        }

        return JSON.parse(JSON.stringify(clientConfig))
    }

    isRedirectUrlCorrect(id: string, redirectUrl: string): boolean | undefined {
        const config = this.getClient(id);
        if (!config || !config.redirectUrls) {
            return undefined;
        }

        return config.redirectUrls.find(ru => ru === redirectUrl) !== undefined;
    }

    isBlocked(id: string, email: string): boolean | undefined {
        const config = this.getClient(id);
        if (!config) {
            return undefined;
        }

        const emailConfig = config.email;

        if (!emailConfig) {
            return false;
        }
        
        if (emailConfig.allowedEmails.find((e => e === email))) {
            return false
        }

        if (emailConfig.blockedPattern && emailConfig.blockedPattern.trim() !== "") {
            const blockedPattern = new RegExp(emailConfig.blockedPattern);
            if(blockedPattern.test(email)) {
                return true;
            }
        }

        if (emailConfig.blockedEmails.find((e => e === email))) {
            return true
        }

        if (emailConfig.allowPattern && emailConfig.allowPattern.trim() !== "") {
            const allowPattern = new RegExp(emailConfig.allowPattern);
            return !allowPattern.test(email) === true;
        } else {
            return !emailConfig.allowedEmails.find((e => e === email));
        }
    }
}

export default new ClientsService();