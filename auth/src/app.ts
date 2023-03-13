import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'
import cors from 'cors';
import SecretsService from "./SecretsService";
import MailService from "./MailService";
import * as path from "path";
import ClientsService from "./ClientsService";

const app = express();
const port = 5050;

app.use(cookieParser());
app.use(cors())
app.use(express.json())

app.get( "/authenticated", (req: Request, res: Response) => {
    const cookies = req.cookies["AUTH_TOKEN"]
    const query = req.query;

    if (!cookies) {
        res.status(401).send();
    } else {
        try {
            const token = cookies.toString().split("BEARER ")[1];
            jwt.verify(token, process.env.TOKEN_SECRET);
            res.status(200).send();
        } catch(err) {
            res.status(401).send();
        }
    }
});

app.post( "/api/login", (req: Request, res: Response) => {
    const query = req.query;
    if (!query || !query['redirect_url'] || !query['clientId'] || !req.body) {
        res.status(400).send();
        return;
    }

    const redirectUrl = query['redirect_url'] as string
    const mail = req.body["mailAddress"];
    const clientId: string = query['clientId'] as string;
    if (!ClientsService.getClient(clientId)) {
        res.status(400).send();
        return;
    }

    if (!ClientsService.isRedirectUrlCorrect(clientId, redirectUrl)) {
        res.status(400).send();
        return;
    }

    if(ClientsService.isBlocked(clientId, mail)) {
        // explicitly allow without sending any code
        console.log(`Email: ${mail} - blocked`)
        res.status(200).send()
        return;
    }

    const secret = SecretsService.generateSecret(mail);

    MailService.sendCode(clientId, 
        mail, 
        secret, 
        `${process.env.PUBLIC_URL}/login/finish?clientId=${clientId}&redirect_url=${redirectUrl}&email=${mail}&password=${secret}`
        ).then(r => {
        res.status(200).send()
    }).catch((err) => {
        console.log(err)
        res.status(500).send()
    })

});

app.patch( "/api/login", (req: Request, res: Response) => {
    const query = req.query;
    if (!query || !query['redirect_url'] || !query['clientId'] || !req.body) {
        res.status(400).send();
        return;
    }

    const data = req.body;
    const clientId: string = query['id'] as string;
    const config = ClientsService.getClient(clientId);


    if (data["mailAddress"]
        && SecretsService.isSecretCorrect(data["mailAddress"], data["secret"])) {
        SecretsService.deleteSecret(data["mailAddress"])
        const token = generateAccessToken({ email: data["mailAddress"] }, config.expiresIn);
        res.cookie('AUTH_TOKEN', `BEARER ${token}`,
            {
                maxAge: config.expiresIn*60*1000,
            })
            .send("OK")
    } else {
        res.status(400).send()
    }
});

app.get("/api/client", (req: Request, res: Response) => {
    const query = req.query;
    if (!query || !query['id']) {
        res.status(400).send();
        return;
    }

    const clientId: string = query['id'] as string;
    const client = ClientsService.getClient(clientId)

    if (!client) {
        res.status(404).send()
        return;
    }

    client.email = undefined;
    client.expiresIn = undefined;
    client.redirectUrls = undefined;

    res.status(200).json(client)

});

app.use('/', express.static('public'))
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.listen( port, () => {
    console.log( `server started at http://localhost:${ port } on ${process.env.PUBLIC_URL}` );
});

function generateAccessToken(username: { email: string }, expiresInMinutes: number) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: `${expiresInMinutes}m`});
}
