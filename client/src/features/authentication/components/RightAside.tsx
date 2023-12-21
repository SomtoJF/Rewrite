import { ReactElement } from "react";
import useFormName from "../hooks/useFormName";
import { Link } from "react-router-dom";
import "./RightAside.styles.sass";
interface RightAsideProps {
	children: ReactElement[];
}

export default function RightAside({ children }: RightAsideProps) {
	const activeFormName = useFormName((state) => state.activeFormName);
	return (
		<aside id="right-aside">
			{children}
			{activeFormName === "login" ? (
				<p>
					New to Rewrite? <Link to="/signup">Create an account</Link>
				</p>
			) : (
				<p>
					Already have an account? <Link to="/login">Login</Link>
				</p>
			)}
		</aside>
	);
}
