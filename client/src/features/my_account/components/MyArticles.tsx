import { ApolloError, gql, useQuery } from "@apollo/client";
import "./MyArticles.styles.sass";
import { Skeleton } from "@mui/material";
import Articles from "./Articles";
import Nosections from "./NoArticles";

type MyArticlesProps = {
	id: string;
};

const MY_ARTICLES_QUERY = gql`
	query getMyArticles($id: String!) {
		account(id: $id) {
			articles {
				title
				description
				est_read_time
				tags
				createdAt
				author {
					firstname
					lastname
					profile_picture
				}
			}
		}
	}
`;

export default function MyArticles({ id }: MyArticlesProps) {
	const { loading, data } = useQuery(MY_ARTICLES_QUERY, {
		variables: { id: id },
		onError: (err: ApolloError) => {
			throw new Error(err.message);
		},
		onCompleted: (data) => {
			console.log(data);
		},
	});
	return (
		<section id="my-articles">
			<h2>My Articles</h2>
			{loading ? (
				<section id="articles-container">
					<Skeleton component={"article"} className="productItem" />
					<Skeleton component={"article"} className="productItem" />
					<Skeleton component={"article"} className="productItem" />
					<Skeleton component={"article"} className="productItem" />
					<Skeleton component={"article"} className="productItem" />
					<Skeleton component={"article"} className="productItem" />
				</section>
			) : data.account.articles.length == 0 ? (
				<Nosections />
			) : (
				<section id="articles-container">
					<Articles data={data} />
				</section>
			)}
		</section>
	);
}
