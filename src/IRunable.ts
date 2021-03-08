export default interface IRunable {
    run(params: any): Promise<any>;
}
