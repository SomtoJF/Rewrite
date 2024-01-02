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
							<Avatar
								sx={{
									width: "max(100px, 10vw)",
									height: "max(100px, 10vw)",
									border: "1px solid #383230",
								}}
								src={profile_picture}
							>
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
