import IConfig from './IConfig';
import IModule from './IModule';
export default interface ICall {
    params: any;
    config: IConfig;
    modules: Array<IModule>;
    execute(): Promise<any>;
}
