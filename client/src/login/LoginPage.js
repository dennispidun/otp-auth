import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './LoginPage.module.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Page from "../page/Page";
import ContainerRow from "../page/ContainerRow";
import TextInput from "../components/input/TextInput";
import axios from 'axios';
import { useClientConfiguration } from "../hooks/ClientConfigurationHook";
const LoginPage = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const { clientConfig, errorMsg } = useClientConfiguration();
    const [touched, setTouched] = useState(false);
    const searchParamsStr = searchParams.toString();
    useEffect(() => {
        if (!searchParams.has("redirect_url")
            || searchParams.get("redirect_url") === "") {
            navigate("/login/error");
        }
    }, []);
    const updateEmail = (event) => {
        setEmail(event.target.value);
        if (event.target.value !== "") {
            setError("");
        }
        if (event.target.value === "") {
            setError("Die Email-Adresse wird benötigt.");
        }
    };
    function checkAndNavigate() {
        setTouched(true);
        if (email !== "") {
            axios.post(`/api/login?clientId=${clientConfig.id}&redirect_url=${searchParams.get("redirect_url")}`, {
                mailAddress: email
            }).then((res) => {
                if (res.status === 200) {
                    navigate(`/login/finish?${searchParamsStr}&email=${email}`);
                }
            });
        }
        else {
            setError("Die Email-Adresse wird benötigt.");
        }
    }
    if (errorMsg && errorMsg !== "") {
        return _jsx(Page, { children: _jsx(ContainerRow, { centered: true, children: _jsx("span", { children: errorMsg }) }) });
    }
    if (!clientConfig) {
        return _jsx(Page, { children: _jsx(ContainerRow, { centered: true, children: _jsx("span", { children: "Loading..." }) }) });
    }
    return _jsxs(Page, { children: [_jsx(ContainerRow, { centered: true, children: _jsx("span", { className: styles.orgName, children: clientConfig.text.orgName }) }), _jsx(ContainerRow, { centered: true, children: _jsx("span", { className: styles.applicationName, children: clientConfig.text.applicationName }) }), _jsx(ContainerRow, { centered: true, children: _jsx("span", { className: styles.infoText, children: clientConfig.text.login.infoText }) }), _jsx(ContainerRow, { centered: true, children: _jsx("span", { className: styles.ctaText, children: clientConfig.text.login.ctaText }) }), _jsx(ContainerRow, { centered: true, children: _jsxs("div", { className: styles.sendCodeOption, children: [_jsx(TextInput, { isTouched: touched, error: error, label: "Email", placeholder: clientConfig.text.login.emailPlaceholder, onChange: updateEmail }), _jsx("button", { onClick: checkAndNavigate, children: "Sende mir ein Passwort" })] }) })] });
};
export default LoginPage;
