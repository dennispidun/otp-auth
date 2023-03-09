import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
export const useClientConfiguration = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [clientConfig, setClientConfig] = useState();
    const [errorMsg, setErrorMsg] = useState();
    useEffect(() => {
        const clientId = searchParams.get("clientId");
        if (!clientId) {
            return;
        }
        axios.get(`/api/client?id=${clientId}`)
            .then((res) => {
            if (res.status === 200) {
                setClientConfig(res.data);
            }
        }).catch((err) => {
            setErrorMsg("Unable to get client configuration.");
        });
    }, [searchParams]);
    return { clientConfig, errorMsg };
};
