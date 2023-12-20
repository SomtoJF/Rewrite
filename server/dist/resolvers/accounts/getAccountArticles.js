import Article from "../../models/articles.js";
const getAccountArticles = async (parent) => {
    return await Article.find({ author_id: parent._id });
};
export default getAccountArticles;
