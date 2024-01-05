import {
	FormOutlined,
	LogoutOutlined,
	MenuOutlined,
	UserOutlined,
	ArrowRightOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Drawer } from "antd";
import firebase from "firebase/compat/app";
import "./MobileMenu.styles.sass";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

interface PropsInterface {
	currentUser: firebase.User | undefined;
}

export default function MobileMenu({ currentUser }: PropsInterface) {
	const [open, setOpen] = useState(false);
	const { logout } = useAuth();

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<button id="mobile-menu" onClick={showDrawer}>
				<MenuOutlined />
			</button>
			<Drawer
				title="REWRITE BLOG"
				placement="top"
				closable={true}
				onClose={onClose}
				open={open}
				key="top"
				id="nav-mobile-drawer"
				height={"60%"}
			>
				<button onClick={onClose}>
					<HomeOutlined />
					<Link to={"/"}>Home</Link>
				</button>
				{currentUser ? (
					<>
						<button onClick={onClose}>
							<UserOutlined />
							<Link to={`/account/${currentUser.uid}`}>My Account</Link>
						</button>
						<button onClick={onClose}>
							<FormOutlined />
							<Link to="/article/create">Write an Article</Link>
						</button>
						<button
							onClick={() => {
								logout();
								onClose();
							}}
							style={{ color: "red" }}
						>
							<LogoutOutlined />
							Logout
						</button>
					</>
				) : (
					<>
						<button onClick={onClose}>
							<Link to="/login">Login</Link>
							<ArrowRightOutlined />
						</button>
						<button onClick={onClose}>
							<Link to="/signup">Signup</Link>
							<ArrowRightOutlined />
						</button>
					</>
				)}
			</Drawer>
		</>
	);
}
