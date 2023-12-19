import Account from "../../models/accounts.js";
const getAccount = async (_, args) => await Account.findById(args.id);
export default getAccount;
