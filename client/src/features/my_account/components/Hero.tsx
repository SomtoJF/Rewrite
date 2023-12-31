import { Avatar } from "@mui/material";
import "./Hero.styles.sass";
import Modal from "./ProfilePictureModal.tsx";
import { useState } from "react";

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
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<header id="account-hero">
				<div />
				<div>
					<Modal
						open={isModalOpen}
						setOpen={setIsModalOpen}
						title="Upload new profile picture"
						trigger={
							<Avatar sx={{ width: 150, height: 150 }} src={profile_picture}>
								{" "}
								{`${firstname.charAt(0)} ${lastname.charAt(0)}`}
							</Avatar>
						}
					/>

					<p>{`${firstname} ${lastname}`}</p>
				</div>
			</header>
		</>
	);
}
