import { useState } from "react";
import "../features/createBlogPost/CreateBlogPost.styles.sass";
import BlogPostform from "../features/createBlogPost/components/BlogPostform";
import BlogPostAside from "../features/createBlogPost/components/BlogPostAside";

export default function CreateBlogPost() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [content, setContent] = useState("");
	const [tags, setTags] = useState<string[]>([]);
	const [thumbnailUrl, setThumbnailUrl] = useState("");
	const [imagesUrl, setImagesUrl] = useState("");

	return (
		<main id="create-blog-post" className="page">
			<h1>Write a new post</h1>
			<div id="create-blog-form-container">
				<BlogPostform
					title={title}
					setTitle={setTitle}
					description={description}
					setDescription={setDescription}
					content={content}
					setContent={setContent}
					tags={tags}
					setTags={setTags}
				/>
				<BlogPostAside />
			</div>
		</main>
	);
}
