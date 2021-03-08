import IModule from './IModule';

export default class InjectModule implements IModule {
    private m_func: Function;
    constructor(func: Function) {
        this.m_func = func;
    }
    public run(data: any): any {
        return this.m_func(data);
    }
}
