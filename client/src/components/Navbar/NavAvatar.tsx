import Avatar from "@mui/material/Avatar";

interface NavAvatarProps {
	profile_picture?: string;
	firstname: string;
	lastname: string;
}

export default function NavAvatar({
	firstname,
	lastname,
	profile_picture,
}: NavAvatarProps) {
	return (
		<Avatar
			sx={{ backgroundColor: "#383230", border: "solid 1px #383230" }}
			src={profile_picture}
		>
			<span title={`${firstname} ${lastname}`}>{`${firstname.charAt(
				0
			)}${lastname.charAt(0)}`}</span>
		</Avatar>
	);
}
