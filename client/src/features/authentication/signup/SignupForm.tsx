import { useState, FormEvent } from "react";
import { useAuth } from "../../../contexts/authContext";
import Loader from "../../../components/Loader";
import "./SignupForm.styles.sass";

export default function SignupForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [loading, setLoading] = useState(false);
	const { signup } = useAuth();

	const handleSubmit = async (e: FormEvent) => {
		try {
			e.preventDefault();
			setLoading(true);
			await signup(email, password);
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
			id="signup-form"
			className="auth-form"
		>
			<h2>Create a Rewrite account</h2>
			<label htmlFor="firstname">
				Firstname
				<input
					type="text"
					name="firstname"
					id="firstname"
					placeholder="John"
					value={firstname}
					required
					maxLength={25}
					onChange={(e) => {
						setFirstName(e.target.value);
					}}
				/>
			</label>
			<label htmlFor="lastname">
				Lastname
				<input
					type="text"
					name="lastname"
					id="lastname"
					placeholder="Doe"
					value={lastname}
					required
					maxLength={25}
					onChange={(e) => {
						setLastName(e.target.value);
					}}
				/>
			</label>
			<label htmlFor="email">
				Email
				<input
					type="email"
					name="email"
					id="email"
					placeholder="email@email.com"
					value={email}
					required
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
					required
					minLength={6}
					title="Password must be at least 6 characters"
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
