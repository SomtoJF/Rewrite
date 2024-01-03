import Article from "../../models/articles.js";
const getBookmarkedArticles = async (parent) => {
    const response = await Article.find({
        _id: { $in: parent.bookmarked_articles_id },
    });
    return response;
};
export default getBookmarkedArticles;
