import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {ICarStore} from "~/core/stores/Car.store";
import styles from "./CarCard.module.scss";
import EmptyItem from "~/components/simple/EmptyItem/EmptyItem";
import {Button, Skeleton, TextField} from "@mui/material";

interface ICarCard {
    carStore: ICarStore;
}

const CarCard: React.FC<ICarCard> = ({ carStore }) => {
    const { currentCar, deleteCar, isLoadingCurrentCar } = carStore
    React.useEffect(() => {
    }, [currentCar])
    return (
        <div className={styles.container}>
            {isLoadingCurrentCar ?
                <div className={styles.carInfo}>
                    <Skeleton variant="rounded" width={207} height={48}/>
                    <Skeleton variant="rounded" width={207} height={48}/>
                    <Skeleton variant="rounded" width={207} height={48}/>
                    <Skeleton variant="rounded" width={207} height={48}/>
                    <Skeleton variant="rounded" width={207} height={48}/>
                    <Skeleton variant="rounded" width={207} height={48}/>
                    <Skeleton variant="rounded" width={207} height={48}/>
                    <div className={styles.deleteCar}>
                        <Skeleton variant="rounded" width={180} height={40}/>
                    </div>
                </div> :
                <>
                    {currentCar ?
                        <div className={styles.carInfo}>
                            <TextField
                                id="standard-read-only-input"
                                label="Номерной знак"
                                value={currentCar.licencePlate ?? ''}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                className={styles.carInfoItem}
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="Марка"
                                value={currentCar.stamp ?? ''}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                className={styles.carInfoItem}
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="Модель"
                                value={currentCar.model ?? ''}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                className={styles.carInfoItem}
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="VIN"
                                value={currentCar.bodyNumber ?? ''}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                className={styles.carInfoItem}
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="Год"
                                value={currentCar.year ?? ''}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                className={styles.carInfoItem}
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="Масло"
                                value={currentCar.oil ?? ''}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                className={styles.carInfoItem}
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="Пробег"
                                value={currentCar.odometer ?? ''}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                                className={styles.carInfoItem}
                            />
                            <div className={styles.deleteCar}>
                                <Button variant="outlined" color="error" onClick={() => deleteCar(currentCar.id)}>
                                    Удалить машину
                                </Button>
                            </div>
                        </div>
                    : <EmptyItem />}
                </>
            }
        </div>
    )
}

export default inject('carStore')(observer(CarCard));