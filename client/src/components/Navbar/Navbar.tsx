import Logo from "../Logo";
import { useAuth } from "../../contexts/authContext";
import "./Navbar.styles.sass";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { ApolloError, gql, useQuery } from "@apollo/client";
import { LoadingOutlined, MenuOutlined } from "@ant-design/icons";
import NavAvatar from "./NavAvatar";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";
import { FormEvent, useState } from "react";
import { message } from "antd";

const DATA = gql`
	query getData($id: String!) {
		account(id: $id) {
			_id
			firstname
			lastname
			profile_picture
		}
	}
`;

export default function Navbar() {
	const { currentUser } = useAuth();
	const [messageApi, contextHolder] = message.useMessage();
	const { data, loading } = useQuery(DATA, {
		variables: { id: currentUser?.uid },
		skip: !currentUser,
		onError: (err: ApolloError) => {
			throw new Error(err.message);
		},
	});
	const [searchText, setSearchText] = useState("");

	const error = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	// const success = (message: string) => {
	// 	messageApi.open({
	// 		type: "success",
	// 		content: message,
	// 	});
	// };

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		error("This feature is still under development");
	};

	return (
		<>
			{contextHolder}
			<nav id="top-nav">
				<Logo />
				<form
					action=""
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<label htmlFor="seachbar">
						<SearchOutlinedIcon />
						<input
							type="text"
							name="search"
							id="searchbar"
							value={searchText}
							onChange={(e) => {
								setSearchText(e.target.value);
							}}
							placeholder="Search the platform..."
						/>
					</label>
				</form>
				{loading ? (
					<LoadingOutlined />
				) : data ? (
					<NavDropdown>
						<NavAvatar
							firstname={data.account.firstname}
							lastname={data.account.lastname}
							profile_picture={data.account.profile_picture}
						/>
					</NavDropdown>
				) : (
					<div>
						<button className="auth-nav-button" id="login-button">
							<Link to="/login">Login</Link>
						</button>
						<button className="auth-nav-button" id="signup-button">
							<Link to="/signup">Sign up</Link>
						</button>
					</div>
				)}
				{!loading && (
					<MobileMenu currentUser={currentUser}>
						{data ? (
							<NavAvatar
								firstname={data.account.firstname}
								lastname={data.account.lastname}
								profile_picture={data.account.profile_picture}
							/>
						) : (
							<MenuOutlined />
						)}
					</MobileMenu>
				)}
			</nav>
		</>
	);
}
