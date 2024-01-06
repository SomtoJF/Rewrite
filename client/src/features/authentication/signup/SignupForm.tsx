import { useState, FormEvent, useEffect } from "react";
import { useAuth } from "../../../contexts/authContext";
import "./SignupForm.styles.sass";
import { auth } from "../../../Firebase/firebase";
import CREATE_ACCOUNT_MUTATION from "../../../services/authentication/createAccount";
import { useMutation } from "@apollo/client";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
	LoadingOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
} from "@ant-design/icons";

export default function SignupForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [loading, setLoading] = useState(false);
	// currentUser is just being used as a placeholder for the updated user
	const { signup, login, currentUser } = useAuth();
	const [updatedUser, setUpdatedUser] = useState<firebase.User>(currentUser);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [postAccountData] = useMutation(CREATE_ACCOUNT_MUTATION, {
		variables: {
			account: {
				_id: updatedUser?.uid,
				firstname: firstname,
				lastname: lastname,
			},
		},
	});

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user: any) => {
			setUpdatedUser(user);
		});
		return unsubscribe;
	}, []);

	const handleSubmit = async (e: FormEvent) => {
		try {
			e.preventDefault();
			setLoading(true);
			await signup(email, password);
			await login(email, password);
			setTimeout(async () => {
				const response = await postAccountData();
				console.log(response);
			}, 2000);
			enqueueSnackbar("Account Created Successfully", { variant: "success" });
			navigate("/");
		} catch (err: any) {
			enqueueSnackbar("We couldn't create your account", { variant: "error" });
			throw new Error(err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<form
			action=""
			onSubmit={(e) => {
				handleSubmit(e);
			}}
			id="signup-form"
			className="auth-form"
		>
			<h2>Create a Rewrite account</h2>
			<label htmlFor="firstname">
				First name*
				<input
					type="text"
					name="firstname"
					id="firstname"
					placeholder="Enter your first name"
					value={firstname}
					required
					maxLength={25}
					onChange={(e) => {
						setFirstName(e.target.value);
					}}
				/>
			</label>
			<label htmlFor="lastname">
				Last name*
				<input
					type="text"
					name="lastname"
					id="lastname"
					placeholder="Enter last name"
					value={lastname}
					required
					maxLength={25}
					onChange={(e) => {
						setLastName(e.target.value);
					}}
				/>
			</label>
			<label htmlFor="email">
				Email*
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Enter your email"
					value={email}
					required
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
			</label>
			<label htmlFor="password">
				Password*
				<div id="password-container">
					<input
						type={passwordVisible ? "text" : "password"}
						name="password"
						id="password"
						required
						minLength={6}
						title="Password must be at least 6 characters"
						value={password}
						placeholder="Enter your password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<button
						type="button"
						onClick={() => {
							setPasswordVisible(!passwordVisible);
						}}
					>
						{!passwordVisible ? (
							<EyeOutlined color="#383230" />
						) : (
							<EyeInvisibleOutlined color="#383230" />
						)}
					</button>
				</div>
			</label>
			<button type="submit" disabled={loading}>
				{loading ? <LoadingOutlined /> : "submit"}
			</button>
		</form>
	);
}
