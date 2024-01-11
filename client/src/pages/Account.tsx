import { useParams } from "react-router-dom";
import Hero from "../features/my_account/components/Hero";
import MyArticles from "../features/my_account/components/MyArticles";
import { gql, useQuery } from "@apollo/client";
import Error from "../components/Error/Error";
import { Tabs, Spin } from "antd";
import type { TabsProps } from "antd";
import Articles from "../components/Articles/Articles";
import { useAuth } from "../contexts/authContext";
import "../features/my_account/Account.styles.sass";

const ACCOUNT_QUERY = gql`
	query AccountQuery($id: String!) {
		account(id: $id) {
			firstname
			lastname
			profile_picture
			banner_picture
			bookmarked_articles {
				_id
				title
				description
				tags
				est_read_time
				thumbnail_url
				createdAt
				author {
					firstname
					lastname
					profile_picture
					_id
				}
			}
		}
	}
`;

export default function Account() {
	const { id } = useParams();
	const { currentUser } = useAuth();
	const currentUserId = currentUser?.uid;
	const { error, loading, data } = useQuery(ACCOUNT_QUERY, {
		variables: { id: id },
	});
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "My Articles",
			children: <MyArticles id={id!} />,
		},
		{
			key: "2",
			label: "Bookmarked Articles",
			children: loading ? (
				<Spin />
			) : (
				<>
					<h2
						style={{
							padding: "0px 5%",
							margin: "50px 0px",
							boxSizing: "border-box",
						}}
					>
						Bookmarked Articles
					</h2>
					<Articles data={data.account.bookmarked_articles} />
				</>
			),
		},
	];
	if (!loading) {
		return (
			<main className="page" id="account-page">
				<Hero
					banner_picture={data.account.banner_picture}
					firstname={data.account.firstname}
					lastname={data.account.lastname}
					profile_picture={data.account.profile_picture}
					id={id}
				/>
				{currentUserId === id ? (
					<Tabs
						defaultActiveKey="1"
						items={items}
						tabBarStyle={{
							width: "100%",
							paddingLeft: "7.5%",
							color: "grey",
						}}
					/>
				) : (
					<MyArticles id={id!} />
				)}
			</main>
		);
	}
	if (error) return <Error />;
}
