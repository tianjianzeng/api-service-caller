import ICall from './ICall';
import Iconfig from './IConfig';
import IModule from './IModule';
import IRunable from './IRunable';
export default class AjaxCall implements ICall {
    modules: Array<IModule>;
    params: any;
    config: Iconfig;
    private runable;
    constructor(runable: IRunable);
    execute(): Promise<any>;
}
