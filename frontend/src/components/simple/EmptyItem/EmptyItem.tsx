import React from "react";
import styles from "./EmptyItem.module.scss";

interface IEmptyItem {
}

const EmptyItem: React.FC<IEmptyItem> = () => {
    return (
        <div className={styles.container}>
            <div>
                Пусто
            </div>
        </div>
    )
}

export default EmptyItem;