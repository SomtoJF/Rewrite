import Header from "../features/home/Header";
import "../features/home/Home.style.sass";
import { ApolloError, gql, useQuery } from "@apollo/client";
import Articles from "../components/Articles/Articles";

const ARTICLES_QUERY = gql`
	query ArticlesQuery($page: Int!) {
		articles(page: $page) {
			_id
			title
			description
			est_read_time
			tags
			createdAt
			thumbnail_url
			author {
				firstname
				lastname
				_id
			}
		}
	}
`;

export default function Home() {
	const { loading, data } = useQuery(ARTICLES_QUERY, {
		variables: { page: 1 },
		onError: (error: ApolloError) => {
			throw new Error(error.message);
		},
	});

	return (
		<div className="page" id="home-page">
			<Header />
			<h3 id="recent-articles">RECENT ARTICLES</h3>
			{!loading && <Articles data={data.articles} />}
		</div>
	);
}
