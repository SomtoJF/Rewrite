import Article from "../../models/articles.js";
const getArticle = async (_, args) => await Article.findById(args.id);
export default getArticle;
