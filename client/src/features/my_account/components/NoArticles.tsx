import "./NoArticles.styles.sass";
import { Link } from "react-router-dom";

export default function Nosections() {
	return (
		<section id="no-articles">
			<p>You have no articles yet</p>
			<button>
				<Link to="/article/create">Publish your first</Link>{" "}
			</button>
		</section>
	);
}
