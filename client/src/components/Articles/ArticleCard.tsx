import { Link } from "react-router-dom";
import moment from "moment";
import { Tag } from "antd";

type CardProps = {
	article: {
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
};

const tagStyles = {
	backgroundColor: "inherit",
	border: "1px solid #383230",
	borderRadius: "0px",
};

const defaultArticleThumbnail =
	"https://ucarecdn.com/ec09d892-c584-4f98-9a0f-debb55667488/-/preview/500x500/-/quality/smart_retina/-/format/auto/";

export default function ArticleCard({ article }: CardProps) {
	return (
		<Link
			to={`/article/${article._id}`}
			key={article._id}
			className="article-link"
		>
			<article className="article">
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
							{article.author.firstname.charAt(0)}. {article.author.lastname}
						</Link>
					</p>
					<span className="bold">Duration</span>
					<p>{article.est_read_time}</p>
				</div>
			</article>
		</Link>
	);
}
