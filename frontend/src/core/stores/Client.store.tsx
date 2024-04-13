import {makeAutoObservable, runInAction} from 'mobx';
import { toast } from 'react-hot-toast';

class ClientStore {
    isLoading: boolean = false;
    clients: TClients[] = [];
    currentClient: TClients | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (bool: boolean) => {
        this.isLoading = bool;
    }

    receiveListClients = () => {
        try {
            this.setLoading(true);
            // const response = await $api.post<AuthResponse>('/clients');
            const response = require('./__mock__/data.js').data['/clients'];
            runInAction(() => {
                this.clients = response;
            })
        } catch (error) {
            console.error('*---receiveListClients', error);
            toast.error(`${error}`);
        } finally {
            this.setLoading(false);
        }
    }

    receiveCurrentClient = (id: number) => {
        try {
            this.setLoading(true);
            // const response = await $api.post<AuthResponse>(`/clients/${id}`);
            const response = require('./__mock__/data.js').data[`/clients/${id}`];
            runInAction(() => {
                this.currentClient = response;
            })
        } catch (error) {
            console.error('*---receiveCurrentClient', error);
            toast.error(`${error}`);
        } finally {
            this.setLoading(false);
        }
    }
}

export default ClientStore;

export interface IClientStore extends ClientStore {
}