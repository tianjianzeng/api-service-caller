import IModule from './IModule';
import IConfig from './IConfig';
import ICall from './ICall';
import IRunable from './IRunable';
import IFactory from './IFactory';
import AjaxFactory from './AjaxFactory';
import CacheModule from './CacheModule';
import AjaxCall from './AjaxCall';
import InjectModule from './InjectModule';
export {
    IModule,
    IConfig,
    ICall,
    IFactory,
    IRunable,
    AjaxCall,
    AjaxFactory,
    InjectModule,
    CacheModule
};
export default class APIService {
    [x: string]: any;
    private m_calls: Array<ICall> = [];
    private m_factory: IFactory;

    constructor(configs: Array<IConfig>, factory: IFactory) {
        this.m_factory = factory;
        this.init(configs);
    }

    public use(module: IModule): APIService {
        if (this.m_calls.length > 0) {
            let call = this.m_calls[this.m_calls.length - 1];
            call.modules.push(module);
        }
        return this;
    }

    /**
     * 构造函数调用
     */
    public makeCall(config: IConfig): Function {
        let callFunc = (params: Object) => {
            let call: ICall = this.m_factory.createCall();
            call.params = params;
            call.config = config;
            this.m_calls.push(call);
            return this;
        };

        return callFunc;
    }
    public init(configs: Array<IConfig>): APIService {
        configs.forEach(config => {
            if (!this.hasOwnProperty(config.name)) {
                let me = this as APIService;
                me.constructor.prototype[config.name] = this.makeCall(config);
            }
        });
        return this;
    }

    private runModules(call: ICall, data: any): any {
        return call.modules.reduce((prevVal: any, module: IModule) => {
            let val = null;
            if (prevVal) {
                val = module.run(prevVal);
            } else {
                val = module.run(data);
            }
            return val;
        }, null);
    }

    public async executeParallel(): Promise<any> {
        let calls = [...this.m_calls];
        this.m_calls.length = 0;
        let promise = calls.map(call => {
            let p = new Promise(async (resolve, reject) => {
                try {
                    let rst = await call.execute();
                    this.runModules(call, rst);
                    resolve(rst);
                } catch (e) {
                    reject(e);
                }
            });
            return p;
        });

        return Promise.all(promise);
    }

    public async executeSerial(): Promise<any> {
        let calls = [...this.m_calls];
        this.m_calls.length = 0;
        let final = calls.reduce((prev: Promise<ICall>, call: ICall) => {
            return new Promise<ICall>(async (resolve, reject) => {
                try {
                    if (prev) {
                        let prevReal = await prev;
                        if (prevReal) {
                            let rst = await prevReal.execute();
                            if (prevReal.config.process) {
                                let func = prevReal.config.process as Function;
                                rst = func(rst);
                            }
                            if (rst) {
                                let tmp = this.runModules(prevReal, rst);
                                call.params = { ...call.params, ...tmp };
                            }
                        }
                    }
                    resolve(call);
                } catch (e) {
                    reject(e);
                }
            });
        }, new Promise<ICall>(resolve => resolve()));

        let lastRst = await final;

        return lastRst.execute();
    }

    public addService(service: APIService) {}
}
