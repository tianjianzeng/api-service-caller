import IModule from './IModule';
import IConfig from './IConfig';
import ICall from './ICall';
import IRunable from './IRunable';
import IFactory from './IFactory';
import AjaxFactory from './AjaxFactory';
import CacheModule from './CacheModule';
import AjaxCall from './AjaxCall';
import InjectModule from './InjectModule';
export { IModule, IConfig, ICall, IFactory, IRunable, AjaxCall, AjaxFactory, InjectModule, CacheModule };
export default class APIService {
    [x: string]: any;
    private m_calls;
    private m_factory;
    constructor(configs: Array<IConfig>, factory: IFactory);
    use(module: IModule): APIService;
    /**
     * 构造函数调用
     */
    makeCall(config: IConfig): Function;
    init(configs: Array<IConfig>): APIService;
    private runModules;
    executeParallel(): Promise<any>;
    executeSerial(): Promise<any>;
    addService(service: APIService): void;
}
