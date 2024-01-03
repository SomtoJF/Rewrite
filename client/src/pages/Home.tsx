import { useEffect, useRef } from "react";
import Header from "../features/home/Header";
import "../features/home/Home.style.sass";

export default function Home() {
	const cursorRef = useRef<HTMLDivElement>(null);
	const delay = 250;

	function getDimensions(e: MouseEvent) {
		if (cursorRef.current) {
			cursorRef.current.style.top = `${e.clientY - 5}px`;
			cursorRef.current.style.left = `${e.clientX - 5}px`;
		}
	}

	function throttle(callback: any, limit: number) {
		let wait = false;
		return function () {
			if (!wait) {
				callback.apply(null, arguments);
				wait = true;
				setTimeout(function () {
					wait = false;
				}, limit);
			}
		};
	}

	useEffect(() => {
		window.addEventListener("mousemove", (e) => {
			throttle(getDimensions(e), delay);
		});
		return window.removeEventListener("mousemove", (e) => {
			throttle(getDimensions(e), delay);
		});
	}, []);

	return (
		<div className="page" id="home-page">
			<div className="circle" ref={cursorRef} />
			<Header />
		</div>
	);
}
