import APIService from "./Index";
import IConfig from "./IConfig";
import CacheModule from "./CacheModule";
import AjaxFactory from "./AjaxFactory";

const getRestUrl = (url: string, data: any) => {
	return `api/${url}`.replace(/{([\s\S^}]+?)}/g, (arg, $1) => {
		let v = data[$1];
		delete data[$1];
		return v;
	});
};

let configs = new Array<IConfig>();
configs.push(
	{
		name: "getProducts",
		url: "/proxyAPI/api/V1/loanApply",
		method: "get"
	},
	{
		name: "getProduct",
		url: "/proxyAPI/api/V1/access/apply",
		// url: (data: any) => {
		// 	return getRestUrl("product/{id}", data);
		// },
		method: "post"
	},
	{
		name: "getUsers",
		url: "/proxyAPI/api/V1/currency",
		method: "get"
	},
	{
		name: "getUser",
		url: "/proxyAPI/api/V1/access/applyStatus",
		// url: (data: any) => {
		// 	return getRestUrl("user/{id}", data);
		// },
		method: "post"
	}
);
let service = new APIService(configs, new AjaxFactory());

let serialTest = async () => {
	let rst = service
		.getProducts()
		.use(new CacheModule("products"))
		.getProduct()
		.use(new CacheModule("product"))
		.getUsers({ id: "xxxx" })
		.use(new CacheModule("users"))
		.getUser()
		.executeSerial();
	let o = await rst;
	console.log(o);
};
serialTest();

let parallelTest = async () => {
	let rst = service
		.getProducts()
		.getProduct()
		.getUsers()
		.getUser()
		.executeParallel();
	let o = await rst;
	console.log(o);
};
// parallelTest();
