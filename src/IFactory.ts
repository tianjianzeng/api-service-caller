import ICall from './ICall';
import IRunable from './IRunable';
export default interface IFactory {
    setRunable(runable: IRunable): void;
    createCall(): ICall;
}
