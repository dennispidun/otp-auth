import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import Page from "../page/Page";
import ContainerRow from "../page/ContainerRow";
import styles from "./ErrorPage.module.css";
const ErrorPage = () => {
    const navigate = useNavigate();
    return _jsx(Page, { children: _jsx(ContainerRow, { centered: true, children: _jsx("span", { className: styles.errorMessage, children: "Bei dem Versuch die Authentifizierungsseite aufzurufen ist etwas schiefgelaufen." }) }) });
};
export default ErrorPage;
