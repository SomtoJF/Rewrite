import {
	BookFilled,
	BookOutlined,
	DeleteOutlined,
	EditOutlined,
	ShareAltOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, message } from "antd";
import { MoreVertOutlined } from "@mui/icons-material";
import "./MenuDropdown.styles.sass";
import { useAuth } from "../../../contexts/authContext";
import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import usePostProfilePicture from "../../../hooks/useUpdateAccountInfo";

interface MenuDropDownProps {
	authorId: string;
	articleId: string;
}

const GET_ARTICLES_ID_QUERY = gql`
	query GetBookMarkedArticlesId($accountId: String!) {
		account(id: $accountId) {
			bookmarked_articles_id
		}
	}
`;

const DELETE_ARTICLE_MUTATION = gql`
	mutation DeleteArticle($deleteArticleId: String!) {
		deleteArticle(id: $deleteArticleId) {
			title
		}
	}
`;

const MenuDropDown = ({ authorId, articleId }: MenuDropDownProps) => {
	const { currentUser } = useAuth();
	const currentUserId = currentUser ? currentUser.uid : null;
	const { updateAccountInfo } = usePostProfilePicture(currentUserId);
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);

	const success = (text: string) => {
		messageApi.open({
			type: "success",
			content: text,
		});
	};

	const error = (text: string) => {
		messageApi.open({
			type: "error",
			content: text,
		});
	};

	useQuery(GET_ARTICLES_ID_QUERY, {
		variables: { accountId: currentUserId },
		onCompleted(data) {
			setBookmarkedArticles(data.account.bookmarked_articles_id);
		},
	});

	const [deleteArticle] = useMutation(DELETE_ARTICLE_MUTATION, {
		variables: { deleteArticleId: articleId },
		onCompleted: () => {
			success("Article deleted successfully");
			setTimeout(() => {
				navigate(`/account/${currentUserId}`);
			}, 1000);
		},
		onError: (err: ApolloError) => {
			error("Error deleting article");
			throw new Error(err.message);
		},
	});

	const AddArticleToBookmarks = async (articleId: string) => {
		try {
			const updatedBookmarks = bookmarkedArticles.concat(articleId);
			await updateAccountInfo({
				edits: {
					bookmarked_articles_id: updatedBookmarks,
				},
			});
			setBookmarkedArticles(updatedBookmarks);
			success("Article Saved");
		} catch (err: any) {
			error("error saving article");
			throw new Error(err);
		}
	};

	const RemoveArticleFromBookmarks = async (articleId: string) => {
		try {
			const updatedBookmarks = bookmarkedArticles.filter(
				(article) => article !== articleId
			);
			await updateAccountInfo({
				edits: {
					bookmarked_articles_id: updatedBookmarks,
				},
			});
			setBookmarkedArticles(updatedBookmarks);
			success("Article removed from bookmarks");
		} catch (err: any) {
			error("We couldn't unsave this article");
			throw new Error(err);
		}
	};

	const items: MenuProps["items"] = [
		{
			label: (
				<button
					className="dropdown-item"
					onClick={async () => {
						if (!currentUserId) navigate("/login");
						if (bookmarkedArticles.includes(articleId)) {
							RemoveArticleFromBookmarks(articleId);
						} else {
							AddArticleToBookmarks(articleId);
						}
					}}
				>
					{bookmarkedArticles.includes(articleId) ? (
						<>
							<BookFilled /> Saved
						</>
					) : (
						<>
							<BookOutlined /> Save
						</>
					)}
				</button>
			),
			key: "0",
		},
		{
			type: "divider",
		},
		{
			label: (
				<button
					className="dropdown-item"
					onClick={() => {
						try {
							navigator.clipboard.writeText(window.location.href);
							success("Copied to clipboard");
						} catch (e: any) {
							error("An error occurred");
							throw new Error(e);
						}
					}}
				>
					<ShareAltOutlined />
					Share
				</button>
			),
			key: "1",
		},
		{
			type: "divider",
		},
		{
			label: (
				<button className="dropdown-item" disabled={authorId !== currentUserId}>
					<EditOutlined />
					Edit
				</button>
			),
			key: "2",
			disabled: authorId !== currentUserId,
		},
		{
			type: "divider",
		},
		{
			label: (
				<button
					className="dropdown-item danger"
					disabled={authorId !== currentUserId}
					onClick={async () => {
						await deleteArticle();
					}}
				>
					<DeleteOutlined />
					Delete
				</button>
			),
			danger: true,
			key: "3",
			disabled: authorId !== currentUserId,
		},
	];

	return (
		<>
			{contextHolder}
			<Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
				<button type="button" style={{ color: "#383230" }}>
					<MoreVertOutlined style={{ fontWeight: 700 }} />
				</button>
			</Dropdown>
		</>
	);
};

export default MenuDropDown;
