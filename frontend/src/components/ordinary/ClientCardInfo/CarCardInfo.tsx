import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {ICarStore} from "~/core/stores/Car.store";
import styles from "./CarCardInfo.module.scss";
import {Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import AddVisit from "~/components/smart/AddVisit/AddVisit";
import HistoryVisits from "~/components/smart/HistoryVisits/HistoryVisits";

interface ICarCardInfo {
    carStore: ICarStore;
}

const CarCardInfo: React.FC<ICarCardInfo> = ({ carStore }) => {
    const [isShowFormVisit, setShowFormVisit] = React.useState(false);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.addVisit}>
                    <Button onClick={() => setShowFormVisit(!isShowFormVisit)} variant="outlined">{isShowFormVisit ? 'Назад' : 'Новое посещение'}</Button>
                </div>
            </div>
            <Divider />
            <div className={styles.content}>
                {isShowFormVisit ?
                    <AddVisit />
                :
                    <HistoryVisits />
                }
            </div>
        </div>
    )
}

export default inject('carStore')(observer(CarCardInfo));