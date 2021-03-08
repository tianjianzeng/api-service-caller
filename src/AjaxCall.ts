import ICall from './ICall';
import Iconfig from './IConfig';
import IModule from './IModule';
import IRunable from './IRunable';

export default class AjaxCall implements ICall {
    public modules: Array<IModule> = [];
    public params: any;
    public config!: Iconfig;
    private runable: IRunable;
    constructor(runable: IRunable) {
        this.runable = runable;
    }
    public execute(): Promise<any> {
        let url = this.config.url;
        let method = this.config.method;
        let isUpload = this.config.isUpload;
        if (
            Object.prototype.toString
                .call(url)
                .toLowerCase()
                .slice(8, -1) === 'function'
        ) {
            url = (url as Function)(this.params);
        }
        return this.runable.run({
            url,
            method,
            isUpload,
            params: this.params
        });
    }
}
