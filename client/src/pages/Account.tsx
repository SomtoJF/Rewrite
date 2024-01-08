import { useParams } from "react-router-dom";
import Hero from "../features/my_account/components/Hero";
import MyArticles from "../features/my_account/components/MyArticles";
import { gql, useQuery } from "@apollo/client";
import Error from "../components/Error/Error";

const ACCOUNT_QUERY = gql`
	query AccountQuery($id: String!) {
		account(id: $id) {
			firstname
			lastname
			profile_picture
			banner_picture
			articles {
				title
				description
				est_read_time
				tags
				createdAt
			}
		}
	}
`;

export default function Account() {
	const { id } = useParams();
	const { error, loading, data } = useQuery(ACCOUNT_QUERY, {
		variables: { id: id },
	});
	if (!loading) {
		return (
			<main className="page">
				<Hero
					banner_picture={data.account.banner_picture}
					firstname={data.account.firstname}
					lastname={data.account.lastname}
					profile_picture={data.account.profile_picture}
					id={id}
				/>
				<MyArticles id={id!} />
			</main>
		);
	}
	if (error) return <Error />;
}
