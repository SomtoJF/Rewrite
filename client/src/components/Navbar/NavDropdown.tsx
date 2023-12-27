import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { ReactElement } from "react";
import { useAuth } from "../../contexts/authContext";

interface NavDropDownProps {
	children: ReactElement;
}

const dropdownButtonStyles = {
	border: "none",
	backgroundColor: "transparent",
	width: "100%",
};

export default function NavDropdown({ children }: NavDropDownProps) {
	const { logout } = useAuth();
	const items: MenuProps["items"] = [
		{
			key: 0,
			label: "My Account",
		},
		{
			type: "divider",
		},
		{
			key: "1",
			label: (
				<button
					style={{ ...dropdownButtonStyles, textAlign: "left" }}
					type="button"
					onClick={() => {}}
				>
					Profile picture
				</button>
			),
		},
		{
			key: "2",
			danger: true,
			label: (
				<button
					type="button"
					style={{ ...dropdownButtonStyles, color: "red", textAlign: "left" }}
					onClick={() => {
						logout();
						window.location.reload();
					}}
					onMouseOver={(e) => {
						e.currentTarget.style.color = "#f4f4f4";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.color = "red";
					}}
				>
					Logout
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
					}}
				>
					{children}
				</Button>
			</Dropdown>
		</Space>
	);
}
