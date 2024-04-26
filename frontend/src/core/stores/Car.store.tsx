import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-hot-toast';
import $api from '~/core/services/http';
import { CarResponse } from '~/core/models/response/AuthResponse';

class CarStore {
  isLoading: boolean = false;
  isLoadingSidebar: boolean = false;
  isLoadingCurrentCar: boolean = false;
  isLoadingSearchCar: boolean = false;
  isLoadingNewVisit: boolean = false;
  cars: TCarPagination | null = null;
  currentCar: TCar | null = null;
  currentCarVisits: TVisit[] = [];
  currentVisit: TVisit | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  createCar = async (car: TCar) => {
    try {
      runInAction(() => {
        this.isLoadingSidebar = true;
      });
      await $api.post<CarResponse>(process.env['REACT_APP_ROUTE_PREFIX'] + '/car', car);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---createCar', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---createCar', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      runInAction(() => {
        this.isLoadingSidebar = false;
      });
    }
  };

  deleteCar = async (id: number) => {
    try {
      runInAction(() => {
        this.isLoadingSidebar = true;
      });
      await $api.delete<CarResponse>(process.env['REACT_APP_ROUTE_PREFIX'] + `/car?id=${id}`);
      toast.success(`Операция выполнена успешно`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---deleteCar', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---deleteCar', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      runInAction(() => {
        this.isLoadingSidebar = false;
      });
    }
  };

  createVisit = async (visit: TVisit) => {
    try {
      runInAction(() => {
        this.isLoadingNewVisit = true;
      });
      await $api.post<CarResponse>(process.env['REACT_APP_ROUTE_PREFIX'] + '/car/visit', visit);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---createVisit', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---createVisit', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      runInAction(() => {
        this.isLoadingNewVisit = false;
      });
    }
  };

  // Получение списка машин
  receiveListCars = async (page?: number) => {
    try {
      this.setLoading(true);
      const response = await $api.get<TCarPagination>(
        process.env['REACT_APP_ROUTE_PREFIX'] + `/car?page=${page ?? '0'}`
      );
      runInAction(() => {
        this.cars = response.data;
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---receiveListCars', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---receiveListCars', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      this.setLoading(false);
    }
  };
  // Поиск машины
  searchCar = async (field: string, value: string) => {
    try {
      runInAction(() => {
        this.isLoadingSearchCar = true;
      });
      const response = await $api.get<TCarPagination>(
        process.env['REACT_APP_ROUTE_PREFIX'] + `/car?field=${field}&value=${value}`
      );
      runInAction(() => {
        this.cars = response.data;
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---searchCar', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---searchCar', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      runInAction(() => {
        this.isLoadingSearchCar = false;
      });
    }
  };

  // Получение информации по выбранной машине
  receiveCurrentCar = async (id: number) => {
    try {
      runInAction(() => {
        this.isLoadingCurrentCar = true;
      });
      const response = await $api.get<TCar>(process.env['REACT_APP_ROUTE_PREFIX'] + `/car/${id}`);

      const reverseVisits: TVisit[] = [...response?.data?.visits]?.reverse();
      runInAction(() => {
        this.currentCar = { ...response.data, visits: reverseVisits };
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---receiveCurrentCar', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---receiveCurrentCar', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      runInAction(() => {
        this.isLoadingCurrentCar = false;
      });
    }
  };

  // Получение списка посещений для машины
  receiveListVisits = (id: number) => {
    try {
      this.setLoading(true);
      // const response = await $api.post<AuthResponse>(process.env.REACT_APP_ROUTE_PREFIX + '/cars/visits/${id}');
      const response = require('./__mock__/data.js').data[`/cars/visits/${id}`];
      runInAction(() => {
        this.currentCarVisits = response;
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---receiveListVisits', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---receiveListVisits', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      this.setLoading(false);
    }
  };

  setCurrentVisit = (visit: TVisit | null) => {
    runInAction(() => {
      this.currentVisit = visit;
    });
  };
}

export default CarStore;

export interface ICarStore extends CarStore {}
