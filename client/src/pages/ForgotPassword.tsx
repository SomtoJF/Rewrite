import Logo from "../components/Logo";
import LeftAside from "../features/authentication/components/LeftAside";
import RightAside from "../features/authentication/components/RightAside";
import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function ForgotPassword() {
	const { resetPassword } = useAuth();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const error = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	const success = (message: string) => {
		messageApi.open({
			type: "success",
			content: message,
		});
	};

	const handleResetPassword = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (email === "") throw new Error("Please enter your email");
			await resetPassword(email);
			success("Reset link sent successfully. Please check your email");
		} catch (e: any) {
			error(e.message);
			throw new Error(e.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			{contextHolder}
			<main className="auth-page">
				<LeftAside />
				<RightAside>
					<Logo />
					<form action="" id="login-form" style={{ justifyContent: "center" }}>
						<label htmlFor="email">
							Email
							<input
								type="email"
								id="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								required
								name="email"
							/>
						</label>
						<button
							type="submit"
							onClick={(e) => {
								handleResetPassword(e);
							}}
						>
							{loading ? <LoadingOutlined /> : "Reset Password"}
						</button>
					</form>
				</RightAside>
			</main>
		</>
	);
}
