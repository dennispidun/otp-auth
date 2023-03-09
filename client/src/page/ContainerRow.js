import { jsx as _jsx } from "react/jsx-runtime";
import styles from './ContainerRow.module.css';
const ContainerRow = ({ centered, children }) => {
    return _jsx("div", { className: centered && styles.center, children: children });
};
export default ContainerRow;
