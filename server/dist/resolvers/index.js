import createAccount from "./accounts/createAccount.js";
import deleteAccount from "./accounts/deleteAccount.js";
import getAccount from "./accounts/getOneAccount.js";
import updateAccount from "./accounts/updateAccount.js";
const resolvers = {
    Query: {
        account: getAccount,
    },
    Account: {},
    Mutation: {
        createAccount: createAccount,
        deleteAccount: deleteAccount,
        updateAccount: updateAccount,
    },
};
export default resolvers;
