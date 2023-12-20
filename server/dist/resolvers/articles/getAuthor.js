import Account from "../../models/accounts.js";
const getArticleAuthor = async (parent) => await Account.findOne({ _id: parent.author_id });
export default getArticleAuthor;
