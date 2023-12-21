import { useState, FormEvent } from "react";
import { useAuth } from "../../../contexts/authContext";

export default function SignupForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signup } = useAuth();
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await signup(email, password);
	};
	return (
		<form
			action=""
			onSubmit={(e) => {
				handleSubmit(e);
			}}
		>
			<h2>Welcome to Rewrite</h2>
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
			<input
				type="password"
				name="password"
				id="password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			<button type="submit">submit</button>
		</form>
	);
}
