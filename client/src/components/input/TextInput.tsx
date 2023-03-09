import styles from "./TextInput.module.css";
import {ChangeEvent, useState} from "react";

type TextInputProps = {
    initialValue?: string
    isTouched?: boolean
    error?: string
    label?: string
    placeholder?: string
    onChange: (e: ChangeEvent) => void
}

const TextInput = ({isTouched, label, error, onChange, placeholder, initialValue}: TextInputProps) => {

    const [touched, setTouched] = useState(false);

    const onTextInputChange = (e) => {
        setTouched(true);
        onChange(e);
    }

    const getTouchedState = () => touched || isTouched;


    return <div className={styles.input + (getTouchedState() && error ? " " + styles.inputNotValid : "")}>
        {label && <label>{label}</label>}
        <input type={"text"} placeholder={placeholder} onChange={onTextInputChange} defaultValue={initialValue}/>
        {getTouchedState() && error && (
            <p style={{color: "#f84545", paddingBottom: "1.25rem"}}>
                {error}
            </p>
        )}
    </div>
}

export default TextInput;