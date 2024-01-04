import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { ReactElement } from "react";
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import "./NavDropDown.styles.sass";
import { useNavigate } from "react-router-dom";
import { FormOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";

interface NavDropDownProps {
	children: ReactElement;
}

export default function NavDropdown({ children }: NavDropDownProps) {
	const { logout, currentUser } = useAuth();
	const navigate = useNavigate();
	const items: MenuProps["items"] = [
		{
			key: 0,
			label: (
				<button className="dropdown-button">
					<Link to={`/account/${currentUser?.uid}`}>
						<UserOutlined style={{ marginRight: "5px" }} />
						My Account
					</Link>
				</button>
			),
		},
		{
			type: "divider",
		},
		{
			key: "1",
			label: (
				<button className="dropdown-button" type="button" onClick={() => {}}>
					<Link to={"/article/create"}>
						{" "}
						<FormOutlined style={{ marginRight: "5px" }} />
						Write an Article
					</Link>
				</button>
			),
		},
		{
			key: "2",
			danger: true,
			label: (
				<button
					type="button"
					style={{ color: "red" }}
					onClick={() => {
						logout();
						navigate("/");
					}}
					onMouseOver={(e) => {
						e.currentTarget.style.color = "#f4f4f4";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.color = "red";
					}}
				>
					<LogoutOutlined style={{ marginRight: "5px" }} /> Logout
				</button>
			),
		},
	];

	return (
		<Space wrap>
			<Dropdown menu={{ items }} placement="bottom">
				<Button
					style={{
						width: "fit-content",
						height: "fit-content",
						background: "none",
						border: "none",
						boxShadow: "none",
					}}
				>
					{children}
				</Button>
			</Dropdown>
		</Space>
	);
}
