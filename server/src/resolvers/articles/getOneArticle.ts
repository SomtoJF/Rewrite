import Article from "../../models/articles.js";
import { GetByIdArgType } from "../types";

const getArticle = async (_: any, args: GetByIdArgType) =>
	await Article.findById(args.id);

export default getArticle;
