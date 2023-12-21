import illustration from "../../../assets/undraw_nature_on_screen_xkli.svg";
import "./LeftAside.styles.sass";

export default function LeftAside() {
	return (
		<aside id="left-aside">
			<img src={illustration} alt="nature on screen illustration" />
			<h3>Lorem, ipsum dolor.</h3>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
				sunt beatae officia adipisci amet voluptatum iure deleniti sint nemo
				iste?
			</p>
		</aside>
	);
}
