import createAccount from "./accounts/createAccount.js";
import deleteAccount from "./accounts/deleteAccount.js";
import getAccount from "./accounts/getOneAccount.js";
import updateAccount from "./accounts/updateAccount.js";
import getArticle from "./articles/getOneArticle.js";
import getArticles from "./articles/getArticles.js";
import createArticle from "./articles/createArticle.js";
import getArticleAuthor from "./articles/getAuthor.js";
import getAccountArticles from "./accounts/getAccountArticles.js";
import deleteArticle from "./articles/deleteArticle.js";
import updateArticle from "./articles/updateArticle.js";
import getRelatedArticles from "./articles/getRelatedArticles.js";
import getBookmarkedArticles from "./accounts/getBookmarkedArticles.js";
import dateScalar from "./scalars/dateScalar.js";
const resolvers = {
    Date: dateScalar,
    Query: {
        account: getAccount,
        article: getArticle,
        articles: getArticles,
    },
    Account: {
        articles: getAccountArticles,
        bookmarked_articles: getBookmarkedArticles,
    },
    Article: {
        author: getArticleAuthor,
        related_articles: getRelatedArticles,
    },
    Mutation: {
        createAccount: createAccount,
        updateAccount: updateAccount,
        deleteAccount: deleteAccount,
        createArticle: createArticle,
        updateArticle: updateArticle,
        deleteArticle: deleteArticle,
    },
};
export default resolvers;
