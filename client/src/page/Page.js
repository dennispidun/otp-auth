import { jsx as _jsx } from "react/jsx-runtime";
import styles from './Page.module.css';
const Page = ({ children }) => {
    return _jsx("div", { className: styles.container, children: _jsx("div", { children: children }) });
};
export default Page;
