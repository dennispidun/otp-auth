import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./Button.module.css";
const Button = ({ text, onClick, children }) => {
    if (!children) {
        return _jsx("button", { className: styles.button, onClick: onClick, children: text });
    }
    else {
        return _jsx("button", { className: styles.button, onClick: onClick, children: children });
    }
};
export default Button;
