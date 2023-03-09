import styles from './ContainerRow.module.css'
import React from "react";

type ContainerRowProps = {
    centered?: boolean
    children: React.ReactNode
}

const ContainerRow = ({centered, children}: ContainerRowProps) => {
    return <div className={centered && styles.center}>
            {children}
    </div>
}

export default ContainerRow;