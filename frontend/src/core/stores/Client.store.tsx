import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-hot-toast';
import $api from '~/core/services/http';
import { ClientResponse, VisitsResponse } from '~/core/models/response/AuthResponse';

class ClientStore {
  isLoading: boolean = false;
  isLoadingSidebar: boolean = false;
  isLoadingCurrentClient: boolean = false;
  isLoadingSearchClient: boolean = false;
  isLoadingNewVisit: boolean = false;
  clients: TClientPagination | null = null;
  currentClient: TClient | null = null;
  currentClientVisits: TVisit[] = [];
  currentVisit: TVisit | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  clear = () => {
    this.currentVisit = null;
    this.currentClient = null;
    this.currentClientVisits = [];
  };

  createClient = async (client: TClient) => {
    try {
      runInAction(() => {
        this.isLoadingSidebar = true;
      });
      await $api.post<ClientResponse>(process.env['REACT_APP_ROUTE_PREFIX'] + '/client', client);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---createClient', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---createClient', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      runInAction(() => {
        this.isLoadingSidebar = false;
      });
    }
  };

  deleteClient = async (id: number) => {
    try {
      runInAction(() => {
        this.isLoadingSidebar = true;
      });
      await $api.delete<ClientResponse>(process.env['REACT_APP_ROUTE_PREFIX'] + `/client?id=${id}`);
      toast.success(`Операция выполнена успешно`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---deleteClient', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---deleteClient', error);
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
      await $api.post<ClientResponse>(
        process.env['REACT_APP_ROUTE_PREFIX'] + '/client/visit',
        visit
      );
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

  deleteVisit = async (id: number) => {
    try {
      // runInAction(() => {
      //   this.isLoadingNewVisit = true;
      // });
      await $api.delete<ClientResponse>(
        process.env['REACT_APP_ROUTE_PREFIX'] + `/client/visit/${id}`
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---deleteVisit', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---deleteVisit', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      // runInAction(() => {
      //   this.isLoadingNewVisit = false;
      // });
    }
  };

  // Получение списка клиентов
  receiveListClients = async (page?: number) => {
    try {
      this.setLoading(true);
      const response = await $api.get<TClientPagination>(
        process.env['REACT_APP_ROUTE_PREFIX'] + `/client?page=${page ?? '0'}`
      );
      runInAction(() => {
        this.clients = response.data;
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---receiveListClients', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---receiveListClients', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      this.setLoading(false);
    }
  };
  // Поиск клиента
  searchClient = async (field: string, value: string) => {
    try {
      runInAction(() => {
        this.isLoadingSearchClient = true;
      });
      const response = await $api.get<TClientPagination>(
        process.env['REACT_APP_ROUTE_PREFIX'] + `/client?field=${field}&value=${value}`
      );
      runInAction(() => {
        this.clients = response.data;
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---searchClient', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---searchClient', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      runInAction(() => {
        this.isLoadingSearchClient = false;
      });
    }
  };

  // Получение информации по выбранной машине
  receiveCurrentClient = async (id: number) => {
    try {
      runInAction(() => {
        this.isLoadingCurrentClient = true;
      });
      const response = await $api.get<TClient>(
        process.env['REACT_APP_ROUTE_PREFIX'] + `/client/${id}`
      );

      const reverseVisits: TVisit[] = [...response?.data?.visits]?.reverse();
      runInAction(() => {
        this.currentClient = { ...response.data, visits: reverseVisits };
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('*---receiveCurrentClient', error);
        toast.error(`${error.message}`);
      } else {
        console.error('*---receiveCurrentClient', error);
        toast.error('An unknown error occurred');
      }
    } finally {
      runInAction(() => {
        this.isLoadingCurrentClient = false;
      });
    }
  };

  // Получение списка посещений для машины
  receiveListVisits = async (id: number) => {
    try {
      this.setLoading(true);
      const response = await $api.post<VisitsResponse>(
        process.env['REACT_APP_ROUTE_PREFIX'] + `/client/visit/${id}`
      );
      // const response = require('./__mock__/data.js').data[`/cars/visits/${id}`];
      runInAction(() => {
        this.currentClientVisits = response;
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

export default ClientStore;

export interface IClientStore extends ClientStore {}
