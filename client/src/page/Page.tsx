import styles from './Page.module.css'
import React from "react";

type PageProps = {
    children: React.ReactNode
}

const Page = ({children}: PageProps) => {
    return <div className={styles.container}>
        <div>
            {children}
        </div>
    </div>
}

export default Page;