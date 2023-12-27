import { Avatar } from "@mui/material";
import useUserData from "../../../zustand/useUserData";
import "./Hero.styles.sass";

export default function Hero() {
	const userData = useUserData((state) => state.userData);
	return (
		<header id="account-hero">
			<div />
			<div>
				<Avatar
					sx={{ width: 150, height: 150 }}
					src={userData?.account.profile_picture}
				>
					{" "}
					{`${userData?.account.firstname.charAt(
						0
					)} ${userData?.account.lastname.charAt(0)}`}
				</Avatar>
				<p>{`${userData?.account.firstname} ${userData?.account.lastname}`}</p>
			</div>
		</header>
	);
}
