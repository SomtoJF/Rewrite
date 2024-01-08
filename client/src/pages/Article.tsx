import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Spin } from "antd";
import "../features/readArticle/Article.styles.sass";
import Header from "../features/readArticle/components/Header";

const ARTICLE_QUERY = gql`
	query ArticleQuery($id: String!) {
		article(id: $id) {
			title
			description
			content
			tags
			createdAt
			thumbnail_url
			est_read_time
			author {
				_id
				firstname
				lastname
				profile_picture
			}
		}
	}
`;

export default function Article() {
	const { id } = useParams();
	const { data, loading } = useQuery(ARTICLE_QUERY, {
		variables: { id: id },
		onCompleted(data) {
			console.log(data);
		},
	});
	return (
		<main id="article-page">
			{!loading ? (
				<>
					<Header
						title={data.article.title}
						description={data.article.description}
						tags={data.article.tags}
						createdAt={data.article.createdAt}
						authorFirstName={data.article.author.firstname}
						est_read_time={data.article.est_read_time}
						authorLastName={data.article.author.lastname}
						authorId={data.article.author._id}
						profile_picture={data.article.author.profile_picture}
					/>
					<Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
						{data.article.content}
					</Markdown>
				</>
			) : (
				<Spin spinning={loading} fullscreen />
			)}
		</main>
	);
}
