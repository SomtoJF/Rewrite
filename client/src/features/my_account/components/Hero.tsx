import { Avatar } from "@mui/material";
import "./Hero.styles.sass";
import Modal from "./ProfilePictureModal.tsx";
import { useState } from "react";
import useUserData from "../../../zustand/useUserData.ts";

interface HeroProps {
	firstname: string;
	lastname: string;
	profile_picture: string | undefined;
	id: string | undefined;
}

export default function Hero({
	firstname,
	lastname,
	profile_picture,
	id,
}: HeroProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const currentUserId = useUserData((state) => state.userData?.account._id);

	return (
		<>
			<header id="account-hero">
				<div />
				<div>
					{currentUserId === id ? (
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
					) : (
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
					)}

					<p>{`${firstname} ${lastname}`}</p>
				</div>
			</header>
		</>
	);
}
