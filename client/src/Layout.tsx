import "./components/Navbar.styles.sass";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";

export default function Layout() {
	return (
		<div>
			<Navbar />
			<Outlet />
		</div>
	);
}
