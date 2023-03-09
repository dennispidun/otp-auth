import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useSearchParams } from "react-router-dom";
import Page from "../page/Page";
import ContainerRow from "../page/ContainerRow";
import styles from "./FinishPage.module.css";
import TextInput from "../components/input/TextInput";
import Button from "../components/button/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useClientConfiguration } from "../hooks/ClientConfigurationHook";
const FinishPage = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const [secret, setSecret] = useState("");
    const [error, setError] = useState("");
    const { clientConfig, errorMsg } = useClientConfiguration();
    useEffect(() => {
        if (!searchParams.has("redirect_url")
            || searchParams.get("redirect_url") === ""
            || !searchParams.has("email")
            || searchParams.get("email") === "") {
            navigate("/login/error");
        }
        if (searchParams.has("password")) {
            setSecret(searchParams.get("password"));
        }
    }, [searchParams]);
    function checkAndNavigate() {
        if (secret === "") {
            return;
        }
        axios.patch(`/api/login?redirect_url=${searchParams.get("redirect_url")}`, {
            mailAddress: searchParams.get("email"),
            secret
        }).then((res) => {
            if (res.status === 200) {
                window.open(searchParams.get("redirect_url"), "_self");
            }
        }).catch((err) => {
            setError("Das Passwort ist leider nicht richtig oder bereits abgelaufen.");
        });
    }
    if (errorMsg && errorMsg !== "") {
        return _jsx(Page, { children: _jsx(ContainerRow, { centered: true, children: _jsx("span", { children: errorMsg }) }) });
    }
    if (!clientConfig) {
        return _jsx(Page, { children: _jsx(ContainerRow, { centered: true, children: _jsx("span", { children: "Loading..." }) }) });
    }
    return _jsxs(Page, { children: [_jsx(ContainerRow, { centered: true, children: _jsx("span", { className: styles.orgName, children: clientConfig.text.orgName }) }), _jsx(ContainerRow, { centered: true, children: _jsx("span", { className: styles.applicationName, children: clientConfig.text.applicationName }) }), _jsx(ContainerRow, { centered: true, children: _jsx("span", { className: styles.ctaText, children: clientConfig.text.finish.ctaText.split("\n").map(cta => (_jsx("p", { children: cta }))) }) }), _jsx(ContainerRow, { centered: true, children: _jsxs("div", { className: styles.codeInput, children: [_jsx(TextInput, { isTouched: error !== "", initialValue: searchParams.get("password"), label: "Password", placeholder: "0 0 0 0 0 0", error: error, onChange: (e) => setSecret(e.target['value']) }), _jsx(Button, { onClick: checkAndNavigate, text: clientConfig.text.finish.buttonText })] }) })] });
};
export default FinishPage;
