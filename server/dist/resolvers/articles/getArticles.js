import Article from "../../models/articles.js";
const getArticles = async (_, args) => {
    if (args.page <= 0)
        throw new Error("Page number must not be less than 1");
    return await Article.find()
        .skip(15 * (args.page - 1))
        .limit(15);
};
export default getArticles;
