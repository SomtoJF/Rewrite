import "./NoArticles.styles.sass";
import { Link } from "react-router-dom";
import useUserData from "../../../zustand/useUserData";

interface props {
	id: string;
}

export default function Nosections({ id }: props) {
	const _id = useUserData((state) => state.userData?.account._id);
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
