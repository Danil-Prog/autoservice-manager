import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {ICarStore} from "~/core/stores/Car.store";
import styles from "./CarCardInfo.module.scss";
import {Button} from "@mui/material";

interface ICarCardInfo {
    carStore: ICarStore;
}

const CarCardInfo: React.FC<ICarCardInfo> = ({ carStore }) => {
    const { currentCar } = carStore
    const [isShowFormVisit, setShowFormVisit] = React.useState(false);
    const [formData, setFormData] = React.useState({
        comment: '',
        carId: currentCar?.id,
        jobs: [
            { type: '', description: '', price: '' }
        ],
    });

    React.useEffect(() => {
    }, [currentCar])

    const handleInputChange = (index, field, value) => {
        const newjobs = [...formData.jobs];
        newjobs[index][field] = value;
        setFormData({
            ...formData,
            jobs: newjobs
        });
    };

    const onChangeComment = (event) => {
        setFormData({
            ...formData,
            comment: event.target.value
        });
    };

    const addInputPair = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            jobs: [...formData.jobs, { type: '', description: '', price: '' }]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button onClick={() => setShowFormVisit(!isShowFormVisit)} variant="outlined">Новое посещение</Button>
            </div>
            <div className={styles.content}>
                {isShowFormVisit ?
                <form onSubmit={handleSubmit} className={styles.content}>
                    <div className={styles.jobsContainer}>
                        <div className={styles.job}>
                            <div >
                                {formData.jobs.map((pair, index) => (
                                    <div key={index} className={styles.jobs}>
                                        <p>Работа:</p>
                                        <select
                                            value={pair.type}
                                            onChange={(e) => handleInputChange(index, 'type', e.target.value)}>
                                            <option></option>
                                            <option value={'1'}>1</option>
                                            <option value={'2'}>2</option>
                                            <option value={'3'}>3</option>
                                        </select>
                                        <p>Описание:</p>
                                        <input
                                            type="text"
                                            value={pair.description}
                                            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                            placeholder="Первое поле ввода"
                                        />
                                        <p>Цена:</p>
                                        <input
                                            type="text"
                                            value={pair.price}
                                            onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                            placeholder="Второе поле ввода"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className={styles.addJob}>
                                <button onClick={addInputPair}>Добавить работу</button>
                            </div>

                        </div>

                        <div className={styles.comment}>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={onChangeComment}
                                cols={120}
                                rows={20}
                            ></textarea>
                        </div>
                        <button onClick={handleSubmit}>submit</button>
                    </div>
                </form>
                :
                <div>
                    История посещений
                </div>}
            </div>
        </div>
    )
}

export default inject('carStore')(observer(CarCardInfo));