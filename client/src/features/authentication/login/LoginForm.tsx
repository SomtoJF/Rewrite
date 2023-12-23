import { FormEvent, useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import "./LoginForm.styles.sass";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		try {
			e.preventDefault();
			setLoading(true);
			await login(email, password);
			navigate("/");
		} catch (err: any) {
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
					placeholder="email@email.com"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
			</label>
			<label htmlFor="password">
				Password
				<input
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</label>
			{loading ? <Loader /> : <button type="submit">submit</button>}
		</form>
	);
}
