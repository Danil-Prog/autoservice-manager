import { makeAutoObservable, runInAction } from 'mobx';
import $api from '~/core/services/http';
import { toast } from 'react-hot-toast';

class MainStore {
  isLoading: boolean = false;
  calendarVisits: TCalendarVisits[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  receiveCalendarVisits = async (startDate: string, endDate: string) => {
    try {
      this.setLoading(true);
      const response = await $api.get<TCalendarVisits[]>(
        process.env['REACT_APP_ROUTE_PREFIX'] + `/client/visit?start=${startDate}&end=${endDate}`
      );
      runInAction(() => {
        this.calendarVisits = response.data;
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---receiveJobList', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---receiveJobList', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      this.setLoading(false);
    }
  };
}

export default MainStore;

export interface IMainStore extends MainStore {}
