import styles from "./Button.module.css";
import React from "react";

type ButtonProps = {
    text?: string
    onClick?: () => void
    children?: React.ReactNode;
}

const Button = ({text, onClick, children}: ButtonProps) => {

    if (!children) {
        return <button className={styles.button} onClick={onClick}>
            {text}
        </button>
    } else {
        return <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    }
}

export default Button;