import { Avatar } from "@mui/material";
import "./Hero.styles.sass";
import Modal from "./ProfilePictureModal.tsx";
import { useState } from "react";
import { useAuth } from "../../../contexts/authContext.tsx";
import Banner from "./Banner.tsx";
import Bio from "./Bio.tsx";

interface HeroProps {
	firstname: string;
	lastname: string;
	profile_picture: string | undefined;
	banner_picture: string | undefined;
	id: string | undefined;
	bio: string | undefined;
}

export default function Hero({
	firstname,
	lastname,
	profile_picture,
	banner_picture,
	id,
	bio,
}: HeroProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { currentUser } = useAuth();
	const currentUserId = currentUser ? currentUser.uid : undefined;

	return (
		<>
			<header id="account-hero">
				<Banner banner_picture={banner_picture} currentUserId={currentUserId} />
				<div>
					{currentUserId === id ? (
						<Modal
							open={isModalOpen}
							setOpen={setIsModalOpen}
							title="Upload new profile picture"
							currentUserId={currentUserId}
							trigger={
								<Avatar
									sx={{
										width: "max(100px, 10vw)",
										height: "max(100px, 10vw)",
										border: "5px solid #f4f4f4",
									}}
									src={profile_picture}
								>
									{" "}
									{`${firstname.charAt(0)} ${lastname.charAt(0)}`}
								</Avatar>
							}
						/>
					) : (
						<Avatar
							sx={{
								width: "max(100px, 10vw)",
								height: "max(100px, 10vw)",
								border: "5px solid #f4f4f4",
							}}
							src={profile_picture}
						>
							{" "}
							{`${firstname.charAt(0)}${lastname.charAt(0)}`}
						</Avatar>
					)}
					<div>
						<p id="account-usersname">{`${firstname} ${lastname}`}</p>
						<Bio bio={bio} id={id} />
					</div>
				</div>
			</header>
		</>
	);
}
