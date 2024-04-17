import {makeAutoObservable, runInAction} from 'mobx';
import { toast } from 'react-hot-toast';
import $api from "~/core/services/http";
import {CarResponse} from "~/core/models/response/AuthResponse";

class CarStore {
    isLoading: boolean = false;
    cars: TCar[] = [];
    currentCar: TCar;
    currentCarVisits: TVisits[] = []
    currentVisit: TVisits;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (bool: boolean) => {
        this.isLoading = bool;
    }
    
    createCar = async (car: any) => {
        try {
            await $api.post<CarResponse>('/car', {
                body: car,
            });
        } catch (error) {
            toast.error(`${error}`);
        }

    }

    // Получение списка машин
    receiveListCars = async () => {
        try {
            this.setLoading(true);
            // const response = await $api.post<CarResponse>('/car');
            const response = require('./__mock__/data.js').data['/clients'];
            runInAction(() => {
                this.cars = response;
            })
        } catch (error) {
            console.error('*---receiveListCars', error);
            toast.error(`${error}`);
        } finally {
            this.setLoading(false);
        }
    }

    // Получение информации по выбранной машине
    receiveCurrentCar = (id: number) => {
        try {
            this.setLoading(true);
            // const response = await $api.post<AuthResponse>(`/Cars/${id}`);
            const response = require('./__mock__/data.js').data[`/clients/${id}`];
            runInAction(() => {
                this.currentCar = response;
            })
        } catch (error) {
            console.error('*---receiveCurrentCar', error);
            toast.error(`${error}`);
        } finally {
            this.setLoading(false);
        }
    }

    // Получение списка посещений для машины
    receiveListVisits = (id: number) => {
        try {
            this.setLoading(true);
            // const response = await $api.post<AuthResponse>('/cars/visits/${id}');
            const response = require('./__mock__/data.js').data[`/cars/visits/${id}`];
            runInAction(() => {
                this.currentCarVisits = response;
            })
        } catch (error) {
            console.error('*---receiveListCars', error);
            toast.error(`${error}`);
        } finally {
            this.setLoading(false);
        }
    }

    setCurrentVisit = (visit: TVisits) => {
        runInAction(() => {
            this.currentVisit = visit;
        })
        console.log(this.currentVisit)
    }
}

export default CarStore;

export interface ICarStore extends CarStore {
}