import React from "react";
import {ICarStore} from "~/core/stores/Car.store";
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import styles from "./HistoryVisits.module.scss";
import {Button, Card, CardActions, CardContent, ListItemIcon, Typography} from "@mui/material";
import {ArrowBackIosNew, ArrowForwardIos, ArrowRight, ArrowRightOutlined, Settings} from "@mui/icons-material";
import AddVisit from "~/components/smart/AddVisit/AddVisit";

interface IHistoryVisits {
    carStore: ICarStore;
}

const visits = [
    {
        id: 1,
    visitDate: new Date(),
    comment: 'Какой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарийКакой-нибудь комментарий',
    jobs: [
        {
            "id": 1,
            "type": "Работа 1",
            "description": null,
            "price": 2500,
            "done": false
        },
        {
            "id": 2,
            "type": "Работа 2",
            "description": null,
            "price": 500,
            "done": false
        },
        {
            "id": 3,
            "type": "Работа 3",
            "description": null,
            "price": 1500,
            "done": false
        }
    ],
},
    {
        id: 2,
    visitDate: new Date(),
    comment: 'Какой-нибудь комментарий 2',
    jobs: [
        {
            "id": 1,
            "type": "Работа 1",
            "description": 'test',
            "price": 2500,
            "done": false
        },
        {
            "id": 2,
            "type": "Работа 2",
            "description": 'test',
            "price": 500,
            "done": false
        },
        {
            "id": 3,
            "type": "Работа 3",
            "description": 'test',
            "price": 1500,
            "done": false
        }
    ],
},
]


const HistoryVisits: React.FC<IHistoryVisits> = ({ carStore }) => {
    const { setCurrentVisit, currentVisit } = carStore
    const handleClickVisit = (visit) => {
        setCurrentVisit(visit)
    }
    return (<>
        {
            currentVisit ? <AddVisit /> :
                <div className={styles.itemsContainer}>
                    {visits.map((visit, index) => (
                        <div key={index + 'visit'} className={styles.item} onClick={() => handleClickVisit(visit)}>
                            <div>{visit.id}</div>
                            <div>{JSON.stringify(visit.visitDate) ?? ''}</div>
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