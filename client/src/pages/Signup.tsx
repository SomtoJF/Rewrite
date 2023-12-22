import { useEffect } from "react";
import "../features/authentication/auth.styles.sass";
import LeftAside from "../features/authentication/components/LeftAside";
import Logo from "../components/Logo";
import useFormName from "../features/authentication/hooks/useFormName";
import RightAside from "../features/authentication/components/RightAside";
import SignupForm from "../features/authentication/signup/SignupForm";
import "../features/authentication/mediaQueries.styles.sass";

export default function Signup() {
	const setActiveFormName = useFormName((state) => state.setActiveFormName);

	useEffect(() => {
		setActiveFormName("signup");
	});

	return (
		<main id="signup-page" className="auth-page">
			<LeftAside />
			<RightAside>
				<Logo />
				<SignupForm />
			</RightAside>
		</main>
	);
}
