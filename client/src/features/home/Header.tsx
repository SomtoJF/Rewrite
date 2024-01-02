import "./Header.styles.sass";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Header() {
	const headerRef = useRef<HTMLHeadElement>(null);
	const scaleCursorUp = () => {
		gsap.to(".circle", {
			scale: 2.5,
		});
	};
	const scaleCursorDown = () => {
		gsap.to(".circle", {
			scale: 1,
		});
	};

	useEffect(() => {
		const header = headerRef.current;
		header?.addEventListener("mouseenter", scaleCursorUp);
		header?.addEventListener("mouseleave", scaleCursorDown);

		return () => {
			header?.removeEventListener("mouseenter", scaleCursorUp);
			header?.removeEventListener("mouseleave", scaleCursorDown);
		};
	}, []);
	return (
		<header id="home-header" ref={headerRef}>
			<h1>REWRITE</h1>
		</header>
	);
}
