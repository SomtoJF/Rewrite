import Article from "../../models/articles.js";
const deleteArticle = async (_, args) => await Article.findByIdAndDelete(args.id);
export default deleteArticle;
