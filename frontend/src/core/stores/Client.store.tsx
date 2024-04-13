import {makeAutoObservable, runInAction} from 'mobx';
import { AuthResponse } from '~/core/models/response/AuthResponse';
import { toast } from 'react-hot-toast';
import $api from "~/core/services/http";

class ClientStore {
    isLoading: boolean = false;
    clients: TClients[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (bool: boolean) => {
        console.log(bool)
        this.isLoading = bool;
    }

    receiveListClients = () => {
        try {
            // console.log(this.isLoading)
            this.setLoading(true);
            // const response = await $api.post<AuthResponse>('/authenticate');
            // debugger
            const response = require('./__mock__/data.js').data['/clients'];
            console.log('resp -->', response);
            runInAction(() => {
                this.clients = response;
            })
            console.log(this.clients);
        } catch (error) {
            console.error('*---receiveListClients', error);
            toast.error(`${error}`);
        } finally {
            this.setLoading(false);
        }
    }
}

export default ClientStore;

export interface IClientStore extends ClientStore {
}