import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import React from "react";
import {ICarStore} from "~/core/stores/Car.store";
import styles from "./AddVisit.module.scss";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

interface IAddVisit {
    carStore: ICarStore;
}

const AddVisit: React.FC<IAddVisit> = ({ carStore }) => {
    const { currentCar, currentVisit, createVisit } = carStore
    const [formData, setFormData] = React.useState(currentVisit ?? {
        comment: '',
        carId: currentCar?.id,
        jobs: [
            { type: '', description: '', price: '' }
        ],
    });

    React.useEffect(() => {
    }, [currentCar, currentVisit])

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
        createVisit(formData)
    }
    return (
        <form onSubmit={handleSubmit} className={styles.content}>
            <div className={styles.jobsContainer}>
                <div className={styles.job}>
                    <div >
                        {formData.jobs.map((pair, index) => (
                            <div key={index} className={styles.jobs}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 250, width: 250 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Выполненная работа</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={pair.type}
                                        onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                                        label="Работа"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'Работа 1'}>Ten</MenuItem>
                                        <MenuItem value={'Работа 2'}>Twenty</MenuItem>
                                        <MenuItem value={'Работа 3'}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="standard-basic"
                                    label="Описание"
                                    variant="standard"
                                    value={pair.description}
                                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                    sx={{ m: 1, minWidth: 200, maxWidth: 700, width: 700 }}
                                />
                                <TextField
                                    id="standard-basic"
                                    label="Цена"
                                    variant="standard"
                                    value={pair.price}
                                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                    sx={{ m: 1, minWidth: 30, maxWidth: 80 }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.addJob}>
                        <Button variant="outlined" onClick={addInputPair}>Добавить работу</Button>
                    </div>

                </div>

                <div className={styles.comment}>
                    <TextField
                        id="outlined-multiline-static"
                        // label="Описание"
                        multiline
                        rows={6}
                        fullWidth
                        placeholder={'Описание'}
                        name="comment"
                        value={formData.comment}
                        onChange={onChangeComment}
                        style={{marginRight: 20}}
                    />
                </div>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    style={{marginBottom: 20}}
                >
                    Сохранить
                </Button>
            </div>
        </form>
    )
}

export default inject('carStore')(observer(AddVisit));