import { useEffect } from "react";
import Logo from "../components/Logo";
import "../features/authentication/auth.styles.sass";
import LeftAside from "../features/authentication/components/LeftAside";
import RightAside from "../features/authentication/components/RightAside";
import LoginForm from "../features/authentication/login/LoginForm";
import useFormName from "../features/authentication/hooks/useFormName";
import "../features/authentication/mediaQueries.styles.sass";

export default function Login() {
	const setActiveFormName = useFormName((state) => state.setActiveFormName);

	useEffect(() => {
		setActiveFormName("login");
	});

	return (
		<main id="login-page" className="auth-page">
			<LeftAside />
			<RightAside>
				<Logo />
				<LoginForm />
			</RightAside>
		</main>
	);
}
