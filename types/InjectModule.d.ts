import IModule from './IModule';
export default class InjectModule implements IModule {
    private m_func;
    constructor(func: Function);
    run(data: any): any;
}
