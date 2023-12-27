import { Avatar } from "@mui/material";
import "./Hero.styles.sass";

interface HeroProps {
	firstname: string;
	lastname: string;
	profile_picture: string | undefined;
}

export default function Hero({
	firstname,
	lastname,
	profile_picture,
}: HeroProps) {
	return (
		<header id="account-hero">
			<div />
			<div>
				<Avatar sx={{ width: 150, height: 150 }} src={profile_picture}>
					{" "}
					{`${firstname.charAt(0)} ${lastname.charAt(0)}`}
				</Avatar>
				<p>{`${firstname} ${lastname}`}</p>
			</div>
		</header>
	);
}
