import { useState } from "react";
import "../features/createBlogPost/CreateBlogPost.styles.sass";
import BlogPostform from "../features/createBlogPost/components/BlogPostform";
import BlogPostAside from "../features/createBlogPost/components/BlogPostAside";
import { useAuth } from "../contexts/authContext";
import { ApolloError, gql, useMutation } from "@apollo/client";
import uploadImage from "../lib/uploadImage";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const CREATE_ARTICLE_QUERY = gql`
	mutation createArticle($article: CreateArticleArgs!) {
		createArticle(article: $article) {
			_id
		}
	}
`;

export default function CreateBlogPost() {
	const { currentUser } = useAuth();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [content, setContent] = useState("");
	const [tags, setTags] = useState<string[]>([]);
	const [thumbnail, setThumbnail] = useState<File>();
	const [messageApi, contextHolder] = message.useMessage();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [isPreviewMode, setIsPreviewMode] = useState(false);

	const error = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	const payload = {
		author_id: currentUser ? currentUser.uid : undefined,
		title,
		description,
		content,
		tags,
	};

	const [postArticle] = useMutation(CREATE_ARTICLE_QUERY, {
		onError: (error: ApolloError) => {
			throw new Error(error.message);
		},
	});

	const handleCreateArticle = async () => {
		if (
			title === "" ||
			description === "" ||
			!thumbnail ||
			tags[0] == null ||
			content === ""
		) {
			error("Please fill all required fields");
			throw new Error("All required fields not filled");
		}
		try {
			setLoading(true);
			const response = await uploadImage(thumbnail);
			if (response.cdnUrl) {
				await postArticle({
					variables: {
						article: { ...payload, thumbnail_url: response.cdnUrl },
					},
				});
				navigate("/");
			} else {
				throw new Error("Something went wrong uploading the thumbnail");
			}
		} catch (error: any) {
			error("We couldn't post your article");
			throw new error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{contextHolder}
			<main id="create-blog-post" className="page">
				<h1>Write a new post</h1>
				{isPreviewMode ? (
					<>
						<p id="preview-container">
							<Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
								{content}
							</Markdown>
						</p>
					</>
				) : (
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
						<BlogPostAside setThumbnail={setThumbnail} />
					</div>
				)}

				<div id="buttons-container">
					<button
						type="button"
						onClick={() => {
							setIsPreviewMode(!isPreviewMode);
						}}
					>
						{isPreviewMode ? "Editor Mode" : "Preview Mode"}
					</button>
					<button
						type="submit"
						disabled={loading}
						onClick={handleCreateArticle}
					>
						{loading ? <LoadingOutlined /> : "Post"}
					</button>
				</div>
			</main>
		</>
	);
}
