import "./NoArticles.styles.sass";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";

interface props {
	id: string;
	currentUser: firebase.User;
}

export default function Nosections({ id, currentUser }: props) {
	const _id = currentUser.uid;
	return (
		<section id="no-articles">
			<p>
				{_id === id
					? "You have no articles yet"
					: "This user has no published articles"}
			</p>
			{_id === id ? (
				<button>
					<Link to="/article/create">Publish your first</Link>{" "}
				</button>
			) : null}
		</section>
	);
}
