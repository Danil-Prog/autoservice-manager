import {makeAutoObservable, runInAction} from 'mobx';
import { toast } from 'react-hot-toast';

class CarStore {
    isLoading: boolean = false;
    cars: TCars[] = [];
    currentCar: TCars;
    currentCarVisits: TVisits[] = []

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (bool: boolean) => {
        this.isLoading = bool;
    }
    
    createCar = (Car: TCars) => {
        
    }

    // Получение списка машин
    receiveListCars = () => {
        try {
            this.setLoading(true);
            // const response = await $api.post<AuthResponse>('/Cars');
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
            // const response = await $api.post<AuthResponse>('/Cars/visits/${id}');
            const response = require('./__mock__/data.js').data[`/Cars/visits/${id}`];
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
}

export default CarStore;

export interface ICarStore extends CarStore {
}