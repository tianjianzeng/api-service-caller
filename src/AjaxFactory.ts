import IFactory from './IFactory';
import ICall from './ICall';
import AjaxCall from './AjaxCall';
import IRunable from './IRunable';
export default class AjaxFactory implements IFactory {
    private m_runable!: IRunable;
    public setRunable(runable: IRunable) {
        this.m_runable = runable;
    }
    public createCall(): ICall {
        return new AjaxCall(this.m_runable);
    }
}
