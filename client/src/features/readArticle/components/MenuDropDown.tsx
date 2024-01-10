import React from "react";
import { BookOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { MoreVertOutlined } from "@mui/icons-material";
import "./MenuDropdown.styles.sass";

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
			<button className="dropdown-item">
				<EditOutlined />
				Edit
			</button>
		),
		key: "1",
	},
	{
		type: "divider",
	},
	{
		label: (
			<button className="dropdown-item danger">
				<DeleteOutlined />
				Delete
			</button>
		),
		danger: true,
		key: "2",
	},
];

const MenuDropDown: React.FC = () => (
	<Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
		<button type="button">
			<MoreVertOutlined style={{ fontWeight: 700 }} />
		</button>
	</Dropdown>
);

export default MenuDropDown;
