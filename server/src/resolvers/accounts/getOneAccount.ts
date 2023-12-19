import { GetByIdArgType } from "../types";
import Account from "../../models/accounts.js";

const getAccount = async (_: any, args: GetByIdArgType) =>
	await Account.findById(args.id);

export default getAccount;
