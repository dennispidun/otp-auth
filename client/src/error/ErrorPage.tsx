import {useNavigate, useSearchParams} from "react-router-dom";
import Page from "../page/Page";
import ContainerRow from "../page/ContainerRow";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
    const navigate = useNavigate();

    return <Page>
        <ContainerRow centered={true}>
            <span className={styles.errorMessage}>
                Something unexpected happened.
            </span>
        </ContainerRow>
    </Page>
}

export default ErrorPage;