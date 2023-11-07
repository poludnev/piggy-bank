import { ServiceDataStore } from './service-data/servive-data-store';

export class DataStore {
  serviceDataStore: ServiceDataStore;
  constructor() {
    this.serviceDataStore = new ServiceDataStore();
  }
}
