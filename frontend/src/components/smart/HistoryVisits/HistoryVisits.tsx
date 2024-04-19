import React from "react";
import {ICarStore} from "~/core/stores/Car.store";
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import styles from "./HistoryVisits.module.scss";
import {Button, Card, CardActions, CardContent, ListItemIcon, Typography} from "@mui/material";
import {ArrowBackIosNew, ArrowForwardIos, ArrowRight, ArrowRightOutlined, Settings} from "@mui/icons-material";
import AddVisit from "~/components/smart/AddVisit/AddVisit";
import {formatDate} from "~/core/utils/formatDate";

interface IHistoryVisits {
    carStore: ICarStore;
}

const HistoryVisits: React.FC<IHistoryVisits> = ({ carStore }) => {
    const { setCurrentVisit, currentVisit, currentCar , isLoadingNewVisit,receiveCurrentCar} = carStore
    const handleClickVisit = (visit) => {
        setCurrentVisit(visit)
    }
    React.useEffect(() => {
        receiveCurrentCar(currentCar.id)
    }, [isLoadingNewVisit])

    return (<>
        {
            currentVisit ? <AddVisit /> :
                <div className={styles.itemsContainer}>
                    {currentCar.visits.map((visit, index) => (
                        <div key={index + 'visit'} className={styles.item} onClick={() => handleClickVisit(visit)}>
                            <div>{visit.id}</div>
                            <div>{formatDate(visit.visitDate) ?? ''}</div>
                            <div className={styles.comment}>{visit.comment ?? ''}</div>
                            <ListItemIcon>
                                <ArrowForwardIos/>
                            </ListItemIcon>
                        </div>
                    ))}
                </div>

        }
        </>
    )
}

export default inject('carStore')(observer(HistoryVisits));