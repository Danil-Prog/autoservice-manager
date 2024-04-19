import {makeAutoObservable, runInAction} from 'mobx';
import { toast } from 'react-hot-toast';
import $api from "~/core/services/http";
import {CarResponse} from "~/core/models/response/AuthResponse";

class CarStore {
    isLoading: boolean = false;
    isLoadingSidebar: boolean = false;
    isLoadingCurrentCar: boolean = false;
    isLoadingSearchCar: boolean = false;
    cars: TCar[] = [];
    currentCar: TCar;
    currentCarVisits: TVisits[] = []
    currentVisit: TVisits | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (bool: boolean) => {
        this.isLoading = bool;
    }

    createCar = async (car: TCar) => {
        try {
            runInAction(() => {
                this.isLoadingSidebar = true;
            })
            await $api.post<CarResponse>(process.env.REACT_APP_ROUTE_PREFIX + '/car',
                car,
            );
        } catch (error) {
            // TODO: Сделать отдельную обработку ошибок
            toast.error(`${error.response.data.violations.map(item => 
                `${item.fieldName}: ${item.message}; \n`
            )}`);
        } finally {
            runInAction(() => {
                this.isLoadingSidebar = false;
            })
        }
    }

    deleteCar = async (id: number) => {
        try {
            runInAction(() => {
                this.isLoadingSidebar = true;
            })
            await $api.delete<CarResponse>(process.env.REACT_APP_ROUTE_PREFIX + `/car?id=${id}`);
            toast.success(`Операция выполнена успешно`);
        } catch (error) {
            toast.error(`${error.response.data.message}`);
        } finally {
            runInAction(() => {
                this.isLoadingSidebar = false;
            })
        }
    }

    // Получение списка машин
    receiveListCars = async () => {
        try {
            this.setLoading(true);
            const response = await $api.get<CarResponse>(process.env.REACT_APP_ROUTE_PREFIX + '/car');
            // const response = require('./__mock__/data.js').data['/clients'];
            runInAction(() => {
                this.cars = response.data.content;
            })
        } catch (error) {
            console.error('*---receiveListCars', error);
            toast.error(`${error?.response?.data?.message}`);
        } finally {
            this.setLoading(false);
        }
    }
    // Поиск машины
    searchCar = async (field: string, value: string) => {
        try {
            runInAction(() => {
                this.isLoadingSearchCar = true;
            })
            const response = await $api.get<CarResponse>(process.env.REACT_APP_ROUTE_PREFIX + `/car?field=${field}&value=${value}`);
            runInAction(() => {
                this.cars = response.data.content;
            })
        } catch (error) {
            console.error('*---searchCar', error);
            toast.error(`${error?.response?.data?.message}`);
        } finally {
            runInAction(() => {
                this.isLoadingSearchCar = false;
            })
        }
    }

    // Получение информации по выбранной машине
    receiveCurrentCar = async (id: number) => {
        try {
            runInAction(() => {
                this.isLoadingCurrentCar = true;
            })
            const response = await $api.get<CarResponse>(process.env.REACT_APP_ROUTE_PREFIX + `/car/${id}`);
            // const response = require('./__mock__/data.js').data[`/clients/${id}`];
            console.log(response)
            runInAction(() => {
                this.currentCar = response.data;
            })
        } catch (error) {
            console.error('*---receiveCurrentCar', error);
            toast.error(`${error.response.data.message}`);
        } finally {
            runInAction(() => {
                this.isLoadingCurrentCar = false;
            })
        }
    }

    // Получение списка посещений для машины
    receiveListVisits = (id: number) => {
        try {
            this.setLoading(true);
            // const response = await $api.post<AuthResponse>(process.env.REACT_APP_ROUTE_PREFIX + '/cars/visits/${id}');
            const response = require('./__mock__/data.js').data[`/cars/visits/${id}`];
            runInAction(() => {
                this.currentCarVisits = response;
            })
        } catch (error) {
            console.error('*---receiveListCars', error);
            toast.error(`${error.response.data.message}`);
        } finally {
            this.setLoading(false);
        }
    }

    setCurrentVisit = (visit: TVisits | null) => {
        runInAction(() => {
            this.currentVisit = visit;
        })
        console.log(this.currentVisit)
    }
}

export default CarStore;

export interface ICarStore extends CarStore {
}