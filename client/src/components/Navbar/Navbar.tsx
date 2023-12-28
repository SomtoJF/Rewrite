import Logo from "../Logo";
import { useAuth } from "../../contexts/authContext";
import "./Navbar.styles.sass";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import useUserData from "../../zustand/useUserData";
import { ApolloError, gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import NavAvatar from "./NavAvatar";
import NavDropdown from "./NavDropdown";

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
	const userData = useUserData((state) => state.userData);
	const setUserData = useUserData((state) => state.setUserData);
	const { data, refetch } = useQuery(DATA, {
		variables: { id: currentUser?.uid },
		skip: !currentUser,
		onError: (err: ApolloError) => {
			throw new Error(err.message);
		},
		onCompleted(data) {
			setUserData(data);
		},
	});

	useEffect(() => {
		if (currentUser) {
			refetch({ id: currentUser.uid });
			setUserData(data);
		}
	}, [currentUser]);

	return (
		<nav id="top-nav">
			<Logo />
			<form action="">
				<label htmlFor="seachbar">
					<SearchOutlinedIcon />
					<input
						type="text"
						name="search"
						id="searchbar"
						placeholder="Search the platform..."
					/>
				</label>
			</form>
			{userData ? (
				<NavDropdown>
					<NavAvatar
						firstname={userData?.account.firstname}
						lastname={userData?.account.lastname}
						profile_picture={userData?.account.profile_picture}
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
		</nav>
	);
}
