import IFactory from './IFactory';
import ICall from './ICall';
import IRunable from './IRunable';
export default class AjaxFactory implements IFactory {
    private m_runable;
    setRunable(runable: IRunable): void;
    createCall(): ICall;
}
