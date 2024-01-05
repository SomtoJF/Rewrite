import { FormEvent, useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import "./LoginForm.styles.sass";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
	LoadingOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
} from "@ant-design/icons";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const handleSubmit = async (e: FormEvent) => {
		try {
			e.preventDefault();
			setLoading(true);
			await login(email, password);
			navigate("/");
			enqueueSnackbar("Login successful", { variant: "success" });
		} catch (err: any) {
			enqueueSnackbar("We couldn't log you in", { variant: "error" });
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
			id="login-form"
			className="auth-form"
		>
			<h2>"Rewrite" your story</h2>
			<label htmlFor="email">
				Email
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
			</label>
			<label htmlFor="password">
				Password
				<div id="password-container">
					<input
						type={passwordVisible ? "text" : "password"}
						name="password"
						id="password"
						placeholder="Enter your password"
						value={password}
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
						{!passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
					</button>
				</div>
			</label>
			<button type="submit" disabled={loading}>
				{loading ? <LoadingOutlined /> : "submit"}
			</button>
		</form>
	);
}
