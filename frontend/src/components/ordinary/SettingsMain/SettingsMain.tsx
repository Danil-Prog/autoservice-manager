import { observer } from 'mobx-react-lite';
import { inject } from 'mobx-react';
import React from 'react';
import styles from './SettingsMain.module.scss';
import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {ICarStore} from "~/core/stores/Car.store";
import {IJobStore} from "~/core/stores/Job.store";

interface ISettingsMain {
    carStore: ICarStore;
    jobStore: IJobStore;
}

const SettingsMain: React.FC<ISettingsMain> = ({carStore, jobStore}) => {
    const { currentCar, currentVisit } = carStore
    const { receiveJobList , isLoading, isLoadingNewJob, jobs, addJob, deleteJob} = jobStore
    const initialFormData = {type: '', description: '', price: '' }
    const [formData, setFormData] = React.useState(initialFormData);

    React.useEffect(() => {
        receiveJobList()
    }, [isLoadingNewJob])
    React.useEffect(() => {
        console.log(JSON.stringify(jobs))
    }, [isLoading])

    const handleInputChange = ( event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        addJob(formData)
        setFormData(initialFormData)
    };

    return (
        <div className={styles.content}>
                <div className={styles.job}>
                    <div>
                        <Typography variant="h5" gutterBottom>
                            Создание шаблона работ
                        </Typography>
                            <div className={styles.job}>

                                <form onSubmit={handleSubmit}>
                                    <Button variant="outlined" color='success' type={'submit'}>Сохранить</Button>
                                    <div className={styles.jobs}>
                                        <TextField
                                            id="standard-basic"
                                            label="Название работы"
                                            variant="standard"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            sx={{m: 1, minWidth: 200, maxWidth: 400, width: 300}}
                                        />
                                        <TextField
                                            id="standard-basic"
                                            label="Описание"
                                            variant="standard"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            sx={{m: 1, minWidth: 200, maxWidth: 700, width: 700}}
                                        />
                                        <TextField
                                            id="standard-basic"
                                            label="Цена"
                                            variant="standard"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            sx={{m: 1, minWidth: 30, maxWidth: 80}}
                                        />
                                    </div>
                                </form>

                                {jobs?.map((job, index) => (
                                        <div className={styles.jobs} key={index}>
                                            <TextField
                                                id="standard-basic"
                                                label="Название работы"
                                                variant="standard"
                                                value={job.type}
                                                sx={{m: 1, minWidth: 200, maxWidth: 400, width: 300}}
                                            />
                                            <TextField
                                                id="standard-basic"
                                                label="Описание"
                                                variant="standard"
                                                value={job.description}
                                                sx={{m: 1, minWidth: 200, maxWidth: 700, width: 700}}
                                            />
                                            <TextField
                                                id="standard-basic"
                                                label="Цена"
                                                variant="standard"
                                                value={job.price}
                                                sx={{m: 1, minWidth: 30, maxWidth: 80}}
                                            />
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                style={{minWidth: 100, marginRight: 10}}
                                                onClick={() => deleteJob(job.id)}
                                            >
                                                Удалить
                                            </Button>
                                        </div>
                                    ))}
                            </div>
                    </div>


                </div>

        </div>
    );
};

export default inject('carStore', 'jobStore')(observer(SettingsMain));