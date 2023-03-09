import crypto from "crypto"

class SecretsService {

    private secrets = new Map();

    public generateSecret(mailAddress: string): string {
        const secret = crypto.randomUUID().replace("-", "").substring(0, 6)
        this.secrets.set(mailAddress, secret);
        return secret;
    }

    public isSecretCorrect(mailAddress: string, secret: string) {
        return this.secrets.has(mailAddress) && this.secrets.get(mailAddress) === secret
    }

    public deleteSecret(mailAddress: string) {
        if (this.secrets.has(mailAddress)) {
            this.secrets.delete(mailAddress)
        }
    }

}

export default new SecretsService();