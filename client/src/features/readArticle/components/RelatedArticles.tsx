import { Divider, Spin } from "antd";
import Articles from "../../../components/Articles/Articles";
import { gql, useQuery } from "@apollo/client";

interface RelatedArticlesProps {
	id: string;
}

const RELATED_ARTICLES_QUERY = gql`
	query RelatedArticles($articleId: String!) {
		article(id: $articleId) {
			related_articles {
				_id
				title
				tags
				est_read_time
				thumbnail_url
				createdAt
				author {
					firstname
					lastname
					_id
					profile_picture
				}
			}
		}
	}
`;

export default function RelatedArticles({ id }: RelatedArticlesProps) {
	const { loading, data } = useQuery(RELATED_ARTICLES_QUERY, {
		variables: { articleId: id },
		onError(error) {
			throw new Error(error.message);
		},
		onCompleted(data) {
			console.log(data);
		},
	});
	return (
		<section>
			<h1>RelatedArticles</h1>
			<Divider />
			{loading ? <Spin /> : <Articles data={data.article.related_articles} />}
		</section>
	);
}
