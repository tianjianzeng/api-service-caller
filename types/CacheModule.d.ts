import IModule from './IModule';
export default class CacheModule implements IModule {
    private m_key;
    private m_storage;
    constructor(key: string, storage?: Storage);
    run(data: any): any;
}
