import Article from "../../models/articles.js";
import { GetByIdArgType } from "../types";

const deleteArticle = async (_: any, args: GetByIdArgType) =>
	await Article.findByIdAndDelete(args.id);

export default deleteArticle;
