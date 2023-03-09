import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./TextInput.module.css";
import { useState } from "react";
const TextInput = ({ isTouched, label, error, onChange, placeholder, initialValue }) => {
    const [touched, setTouched] = useState(false);
    const onTextInputChange = (e) => {
        setTouched(true);
        onChange(e);
    };
    const getTouchedState = () => touched || isTouched;
    return _jsxs("div", { className: styles.input + (getTouchedState() && error ? " " + styles.inputNotValid : ""), children: [label && _jsx("label", { children: label }), _jsx("input", { type: "text", placeholder: placeholder, onChange: onTextInputChange, defaultValue: initialValue }), getTouchedState() && error && (_jsx("p", { style: { color: "#f84545", paddingBottom: "1.25rem" }, children: error }))] });
};
export default TextInput;
