export default interface IConfig {
    name: string;
    url: String | Function;
    method: String;
    process?: Function;
    isUpload?: Boolean;
}
