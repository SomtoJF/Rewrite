import { useEffect } from "react";
import elementIntersectsXAxis from "../../lib/elementIntersectsXAxis";
import moment from "moment";
import { Tag } from "antd";
import "./Articles.styles.sass";
import { Link, useNavigate } from "react-router-dom";

type ArticleProps = {
	data: {
		articles: ArticlesInterface[];
	};
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

const tagStyles = {
	backgroundColor: "inherit",
	border: "1px solid #383230",
	borderRadius: "0px",
};

const defaultArticleThumbnail =
	"https://ucarecdn.com/ec09d892-c584-4f98-9a0f-debb55667488/-/preview/500x500/-/quality/smart_retina/-/format/auto/";

export default function Articles({ data }: ArticleProps) {
	const navigate = useNavigate();

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
			{data.articles.map((article) => (
				<Link to={`/article/${article._id}`} className="article-link">
					<article key={article._id} className="article">
						<div id="date-tags">
							<p>{moment(article.createdAt).format("DD. MMMM YYYY")}</p>
							<div>
								{article.tags.map((tag, index) => (
									<Tag style={tagStyles} key={index + 0.231}>
										{tag}
									</Tag>
								))}
							</div>
						</div>
						<figure>
							<img
								src={
									article.thumbnail_url
										? article.thumbnail_url
										: defaultArticleThumbnail
								}
								alt={article.title}
							/>
						</figure>
						<h3 title={article.title}>{article.title}</h3>
						<p>{article.description}</p>
						<div>
							<span className="bold">Author</span>
							<p
								id="author-name"
								title={`${article.author.firstname} ${article.author.lastname}`}
							>
								<Link to={`/account/${article.author._id}`}>
									{article.author.firstname.charAt(0)}.{" "}
									{article.author.lastname}
								</Link>
							</p>
							<span className="bold">Duration</span>
							<p>{article.est_read_time}</p>
						</div>
					</article>
				</Link>
			))}
		</section>
	);
}
