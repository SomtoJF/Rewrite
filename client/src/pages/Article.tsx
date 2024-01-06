import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "../features/readArticle/Article.styles.sass";

const ARTICLE_QUERY = gql`
	query ArticleQuery($id: String!) {
		article(id: $id) {
			title
			description
			content
			tags
			createdAt
			thumbnail_url
		}
	}
`;

export default function Article() {
	const { id } = useParams();
	const { data, loading } = useQuery(ARTICLE_QUERY, { variables: { id: id } });
	return (
		<main id="article-page">
			{!loading && (
				<Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
					{data.article.content}
				</Markdown>
			)}
		</main>
	);
}
