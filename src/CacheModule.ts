import IModule from './IModule';

export default class CacheModule implements IModule {
    private m_key: string;
    private m_storage: Storage;
    constructor(key: string, storage: Storage = sessionStorage) {
        this.m_key = key;
        this.m_storage = storage;
    }
    public run(data: any): any {
        this.m_storage.setItem(this.m_key, JSON.stringify(data));
        return data;
    }
}
