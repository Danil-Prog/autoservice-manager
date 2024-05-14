import { makeAutoObservable, runInAction } from 'mobx';
import $api from '~/core/services/http';
import { JobResponse } from '~/core/models/response/AuthResponse';
import { toast } from 'react-hot-toast';

class JobStore {
  isLoading: boolean = false;
  isLoadingNewJob: boolean = false;
  jobs: TJob[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  receiveJobList = async () => {
    try {
      this.setLoading(true);
      const response = await $api.get<JobResponse>(
        process.env['REACT_APP_ROUTE_PREFIX'] + '/job/templates?size=9999'
      );
      const reverseResponse = [...response.data.content].reverse();
      runInAction(() => {
        this.jobs = reverseResponse;
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

  addJob = async (job: TJob) => {
    try {
      runInAction(() => {
        this.isLoadingNewJob = true;
      });
      await $api.post<JobResponse>(process.env['REACT_APP_ROUTE_PREFIX'] + '/job/templates', job);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---addJob', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---addJob', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      runInAction(() => {
        this.isLoadingNewJob = false;
      });
    }
  };

  deleteJob = async (id: string) => {
    console.log(id);
    try {
      runInAction(() => {
        this.isLoadingNewJob = true;
      });
      await $api.post<JobResponse>(process.env['REACT_APP_ROUTE_PREFIX'] + `/job/templates/${id}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---deleteJob', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---deleteJob', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      runInAction(() => {
        this.isLoadingNewJob = false;
      });
    }
  };
}

export default JobStore;

export interface IJobStore extends JobStore {}
