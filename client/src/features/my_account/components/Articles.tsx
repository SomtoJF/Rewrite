import { Avatar } from "@mui/material";
import defaultArticleThumbnail from "../../../assets/pexels-vlada-karpovich-4050347 (1).jpg";

type ArticleProps = {
	data: {
		account: {
			articles: ArticlesInterface[];
		};
	};
};

type ArticlesInterface = {
	title: string;
	description: string;
	tags: string[];
	content?: string;
	est_read_time: string;
	thumbnail_url: string | undefined;
	createdAt?: Date;
	author: {
		firstname: string;
		lastname: string;
		profile_picture: string | undefined;
	};
};

export default function Articles({ data }: ArticleProps) {
	return (
		<>
			{data.account.articles.map((article, index) => (
				<article key={index} className="article">
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
					<h3>{article.title}</h3>
					<p>{article.description}</p>
					<div>
						<span
							title={`${article.author.firstname} ${article.author.lastname}`}
						>
							<Avatar
								sx={{
									width: "24px",
									height: "24px",
									fontSize: 11,
									backgroundColor: "#854621",
								}}
								src={article.author?.profile_picture}
							>{`${article.author.firstname.charAt(
								0
							)} ${article.author.lastname.charAt(0)}`}</Avatar>
						</span>
						<p id="author-name">
							{article.author.firstname} {article.author.lastname}
						</p>
						<p>{article.est_read_time}</p>
					</div>
				</article>
			))}
		</>
	);
}
