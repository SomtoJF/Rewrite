import "./BlogPostForm.styles.sass";
import Tags from "./Tags";

interface BlogPostFormProps {
	title: string;
	setTitle: (value: string) => void;
	description: string;
	setDescription: (value: string) => void;
	content: string;
	setContent: (value: string) => void;
	tags: string[];
	setTags: (value: string[]) => void;
}

export default function BlogPostform({
	title,
	setTitle,
	description,
	setDescription,
	content,
	setContent,
	tags,
	setTags,
}: BlogPostFormProps) {
	return (
		<form id="blog-post-form">
			<div>
				<label htmlFor="title">Title*</label>{" "}
				<input
					type="text"
					name="title"
					id="title"
					required
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
			</div>
			<div>
				<label htmlFor="description">Description*</label>
				<input
					type="text"
					name="description"
					id="description"
					required
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
			</div>
			<div>
				<label htmlFor="content">Content*</label>
				<textarea
					name="content"
					id="content"
					required
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
				/>
			</div>
			<div>
				<label htmlFor="tags">Tags*</label>
				<Tags tags={tags} setTags={setTags} />
			</div>
		</form>
	);
}
