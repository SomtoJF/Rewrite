import { BookOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { MoreVertOutlined } from "@mui/icons-material";
import "./MenuDropdown.styles.sass";
import { useAuth } from "../../../contexts/authContext";

interface MenuDropDownProps {
	authorId: string;
}

const MenuDropDown = ({ authorId }: MenuDropDownProps) => {
	const { currentUser } = useAuth();
	const currentUserId = currentUser.uid ? currentUser.uid : null;

	const items: MenuProps["items"] = [
		{
			label: (
				<button className="dropdown-item">
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
		<Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
			<button type="button">
				<MoreVertOutlined style={{ fontWeight: 700 }} />
			</button>
		</Dropdown>
	);
};

export default MenuDropDown;
