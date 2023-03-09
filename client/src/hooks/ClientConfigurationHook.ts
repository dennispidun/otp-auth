import {useEffect, useState} from "react";
import axios from "axios";
import {useSearchParams} from "react-router-dom";

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

interface ClientConfiguration {
    id: string
    redirectUrls: string[]
    expireIn: number
    text: ClientTextConfiguration
}

export const useClientConfiguration = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    const [clientConfig, setClientConfig] = useState<ClientConfiguration>();
    const [errorMsg, setErrorMsg] = useState<string>()

    useEffect(() => {
        const clientId = searchParams.get("clientId")
        if (!clientId) {
            return;
        }

        axios.get(`/api/client?id=${clientId}`)
            .then((res) => {
                if(res.status === 200) {
                    setClientConfig(res.data)
                }
            }).catch((err) => {
                setErrorMsg("Unable to get client configuration.")
            });
    }, [searchParams])

    return {clientConfig, errorMsg};
}