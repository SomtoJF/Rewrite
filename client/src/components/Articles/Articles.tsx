import { useEffect } from "react";
import elementIntersectsXAxis from "../../lib/elementIntersectsXAxis";
import "./Articles.styles.sass";
import ArticleCard from "./ArticleCard";

type ArticleProps = {
	data: ArticlesInterface[];
};

type ArticlesInterface = {
	_id: string;
	title: string;
	description: string;
	tags: string[];
	content?: string;
	est_read_time: string;
	thumbnail_url: string | undefined;
	createdAt: Date;
	author: {
		firstname: string;
		lastname: string;
		profile_picture: string | undefined;
		_id: string;
	};
};

export default function Articles({ data }: ArticleProps) {
	const resolveArticleBorderStyles = () => {
		if (window.innerWidth > 699) {
			const articles = document.querySelectorAll(
				".article"
			) as NodeListOf<HTMLElement>;
			for (let i = 1; i < articles.length; i++) {
				articles[i].style.borderLeft = "solid 1px #383230";
				if (elementIntersectsXAxis(articles[i], articles[i - 1])) {
					articles[i].style.borderLeft = "none";
				}
			}
		}
	};
	useEffect(() => {
		resolveArticleBorderStyles();
		window.addEventListener("resize", resolveArticleBorderStyles);
		return window.removeEventListener("resize", resolveArticleBorderStyles);
	}, []);
	return (
		<section className="articles-container">
			{data.map((article) => (
				<ArticleCard article={article} />
			))}
		</section>
	);
}
