import { BookOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, message } from "antd";
import { MoreVertOutlined } from "@mui/icons-material";
import "./MenuDropdown.styles.sass";
import { useAuth } from "../../../contexts/authContext";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface MenuDropDownProps {
	authorId: string;
	articleId: string;
}

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
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

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

	const items: MenuProps["items"] = [
		{
			label: (
				<button
					className="dropdown-item"
					onClick={() => {
						if (!currentUserId) navigate("/login");
					}}
				>
					<BookOutlined />
					Save
				</button>
			),
			key: "0",
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
			key: "1",
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
			key: "2",
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
