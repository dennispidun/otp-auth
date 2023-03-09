import {Link, useNavigate, useSearchParams} from "react-router-dom";
import Page from "../page/Page";
import ContainerRow from "../page/ContainerRow";
import styles from "./FinishPage.module.css";
import TextInput from "../components/input/TextInput";
import Button from "../components/button/Button";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {useClientConfiguration} from "../hooks/ClientConfigurationHook";

const FinishPage = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const [secret, setSecret] = useState("")
    const [error, setError] = useState("")

    const {clientConfig, errorMsg} = useClientConfiguration()

    useEffect(() => {
        if(!searchParams.has("redirect_url")
            || searchParams.get("redirect_url") === ""
            || !searchParams.has("email")
            || searchParams.get("email") === "") {
            navigate("/login/error")
        }
        if (searchParams.has("password")) {
            setSecret(searchParams.get("password"))
        }
    }, [searchParams])

    function checkAndNavigate() {
        if (secret === "") {
            return;
        }

        axios.patch(`/api/login?redirect_url=${searchParams.get("redirect_url")}`, {
            mailAddress: searchParams.get("email"),
            secret
        }).then((res) => {
            if(res.status === 200) {
                window.open(searchParams.get("redirect_url")!, "_self");
            }
        }).catch((err) => {
            setError("Das Passwort ist leider nicht richtig oder bereits abgelaufen.")
        })
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
            <span className={styles.ctaText}>
                {clientConfig.text.finish.ctaText.split("\n").map(cta => (
                    <p>{cta}</p>
                ))}
            </span>
        </ContainerRow>

        <ContainerRow centered>
            <div className={styles.codeInput}>
                <TextInput
                    isTouched={error !== ""}
                    initialValue={searchParams.get("password")}
                    label={"Password"}
                    placeholder={"0 0 0 0 0 0"}
                    error={error}
                    onChange={(e:ChangeEvent) => setSecret(e.target['value'])}
                />
                <Button onClick={checkAndNavigate} text={clientConfig.text.finish.buttonText}/>
            </div>
        </ContainerRow>
    </Page>
}

export default FinishPage;