import Account from "../models/accounts.js";
const resolvers = {
    Query: {
        account: async (_, args) => await Account.findById(args.id),
    },
    Mutation: {
        createAccount: async (_, args) => {
            try {
                const account = new Account(args.account);
                console.log(args);
                const newAccount = await account.save();
                return newAccount;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        deleteAccount: async (_, args) => await Account.findByIdAndDelete(args.id),
    },
};
export default resolvers;
