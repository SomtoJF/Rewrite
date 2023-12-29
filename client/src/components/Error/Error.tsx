import errorIllustration from "../../assets/404 error lost in space-pana.svg";
import "./Error.styles.sass";
import { useNavigate } from "react-router-dom";

export default function Error() {
	const navigate = useNavigate();
	return (
		<main id="error-component">
			<div>
				<h2>Oops!!</h2>
				<p>
					An error occured. While the problem is being looked into, you could...
				</p>
				<div>
					<button
						type="button"
						onClick={() => {
							window.location.reload();
						}}
					>
						Refresh
					</button>
					<button
						type="button"
						onClick={() => {
							navigate("/");
						}}
					>
						Go Home
					</button>
				</div>
			</div>
			<figure>
				<img src={errorIllustration} alt="error illustration" />
			</figure>
		</main>
	);
}
