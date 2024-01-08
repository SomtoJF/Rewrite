import "./Header.styles.sass";
import moment from "moment";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import NavAvatar from "../../../components/Navbar/NavAvatar";

interface HeaderProps {
	title: string;
	description: string;
	tags: string[];
	createdAt: Date;
	authorFirstName: string;
	authorLastName: string;
	est_read_time: string;
	authorId: string;
	profile_picture: string;
}

const tagStyles = {
	backgroundColor: "inherit",
	border: "1px solid #383230",
	borderRadius: "0px",
};

export default function Header({
	title,
	description,
	tags,
	createdAt,
	authorFirstName,
	authorLastName,
	est_read_time,
	authorId,
	profile_picture,
}: HeaderProps) {
	return (
		<header id="article-header">
			<h1>{title}</h1>
			<p>: {description}</p>
			<div id="article-information">
				<div>
					<div>
						<h4>Author</h4>
						<p>
							<Link
								to={`/account/${authorId}`}
							>{`${authorFirstName} ${authorLastName}`}</Link>
						</p>
					</div>
					<div>
						<h4>Written</h4>
						<p>{moment(createdAt).format("DD. MMMM YYYY")}</p>
					</div>
					<div>
						<h4>Estimated Read Time</h4>
						<p>{est_read_time}</p>
					</div>
				</div>
			</div>
			<div id="article-information-mobile">
				<NavAvatar
					firstname={authorFirstName}
					lastname={authorLastName}
					profile_picture={profile_picture}
				/>
				<div>
					<Link
						to={`/account/${authorId}`}
					>{`${authorFirstName} ${authorLastName}`}</Link>
				</div>
				<div id="mobile-read-time">
					{est_read_time} · {moment(createdAt).fromNow()}
				</div>
			</div>
			<div id="tags-container">
				{tags.map((tag) => (
					<Tag style={tagStyles}>{tag}</Tag>
				))}
			</div>
		</header>
	);
}
