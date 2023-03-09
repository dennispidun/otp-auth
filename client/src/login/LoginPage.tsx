import styles from './LoginPage.module.css'
import {useNavigate, useSearchParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import Page from "../page/Page";
import ContainerRow from "../page/ContainerRow";
import TextInput from "../components/input/TextInput";
import axios from 'axios';
import {useClientConfiguration} from "../hooks/ClientConfigurationHook";

const LoginPage = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("")

    const {clientConfig, errorMsg} = useClientConfiguration()

    const [touched, setTouched] = useState(false)

    const searchParamsStr = searchParams.toString()

    useEffect(() => {
        if(!searchParams.has("redirect_url")
            || searchParams.get("redirect_url") === "") {
            navigate("/login/error")
        }
    }, [])

    const updateEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        if (event.target.value !== "") {
            setError("");
        }
        if (event.target.value === "") {
            setError("Die Email-Adresse wird benötigt.");
        }
    }

    function checkAndNavigate() {
        setTouched(true);
        if (email !== "") {
            axios.post(`/api/login?clientId=${clientConfig.id}&redirect_url=${searchParams.get("redirect_url")}`, {
                mailAddress: email
            }).then((res) => {
                if(res.status === 200) {
                    navigate(`/login/finish?${searchParamsStr}&email=${email}`)
                }
            })
        } else {
            setError("Die Email-Adresse wird benötigt.")
        }
    }

    if (errorMsg && errorMsg !== "") {
        return <Page>
            <ContainerRow centered={true}>
                <span>{errorMsg}</span>
            </ContainerRow>
        </Page>
    }

    if (!clientConfig) {
        return <Page>
            <ContainerRow centered={true}>
                <span>Loading...</span>
            </ContainerRow>
        </Page>
    }

    return <Page>
        <ContainerRow centered={true}>
            <span className={styles.orgName}>
                {clientConfig.text.orgName}
            </span>
        </ContainerRow>

        <ContainerRow centered={true}>
            <span className={styles.applicationName}>
                {clientConfig.text.applicationName}
            </span>
        </ContainerRow>
        <ContainerRow centered={true}>
            <span className={styles.infoText}>
                {clientConfig.text.login.infoText}
            </span>
        </ContainerRow>

        <ContainerRow centered={true}>
            <span className={styles.ctaText}>
                {clientConfig.text.login.ctaText}
            </span>
        </ContainerRow>

        <ContainerRow centered={true}>
            <div className={styles.sendCodeOption}>
                <TextInput isTouched={touched} error={error} label={"Email"} placeholder={clientConfig.text.login.emailPlaceholder} onChange={updateEmail}/>
                <button onClick={checkAndNavigate}>Sende mir ein Passwort</button>
            </div>
        </ContainerRow>
    </Page>
}

export default LoginPage;