import Account from "../../models/accounts.js";
const deleteAccount = async (_, args) => await Account.findByIdAndDelete(args.id);
export default deleteAccount;
