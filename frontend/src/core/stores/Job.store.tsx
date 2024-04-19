import {makeAutoObservable, runInAction} from 'mobx';
import $api from "~/core/services/http";
import {CarResponse, JobResponse} from "~/core/models/response/AuthResponse";
import {toast} from "react-hot-toast";

class JobStore {
    isLoading: boolean = false;
    jobs: TJobs[] = [];


    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (bool: boolean) => {
        this.isLoading = bool;
    }

    receiveJobList = async () => {
        try {
            this.setLoading(true);
            const response = await $api.get<JobResponse>(process.env.REACT_APP_ROUTE_PREFIX + '/job');
            runInAction(() => {
                this.jobs = response.data.content;
            })
        } catch (error) {
            console.error('*---receiveJobList', error);
            toast.error(`${error?.response?.data?.message}`);
        } finally {
            this.setLoading(false);
        }
    }

    addJob = async (job: TCar) => {
        try {
            runInAction(() => {
                this.isLoading = true;
            })
            await $api.post<JobResponse>(process.env.REACT_APP_ROUTE_PREFIX + '/job',
                job,
            );
        } catch (error) {
            // TODO: Сделать отдельную обработку ошибок
            toast.error(`${error.response.data.violations.map(item =>
                `${item.fieldName}: ${item.message}; \n`
            )}`);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            })
        }
    }

}

export default JobStore;

export interface IJobStore extends JobStore {
}