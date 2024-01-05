import Logo from "../Logo";
import { useAuth } from "../../contexts/authContext";
import "./Navbar.styles.sass";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { ApolloError, gql, useQuery } from "@apollo/client";
import { LoadingOutlined } from "@ant-design/icons";
import NavAvatar from "./NavAvatar";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";

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
	const { data, loading } = useQuery(DATA, {
		variables: { id: currentUser?.uid },
		skip: !currentUser,
		onError: (err: ApolloError) => {
			throw new Error(err.message);
		},
	});

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
			{!loading && <MobileMenu />}
		</nav>
	);
}
