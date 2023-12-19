import Account from "../../models/accounts.js";
import { GetByIdArgType } from "../types";

const deleteAccount = async (_: any, args: GetByIdArgType) =>
	await Account.findByIdAndDelete(args.id);

export default deleteAccount;
