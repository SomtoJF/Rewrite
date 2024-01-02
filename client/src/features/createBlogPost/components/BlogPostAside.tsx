import { Divider, Image } from "antd";
import "./BlogPostAside.styles.sass";
import PicturesWall from "./PicturesWall";
import InputFileUpload from "./DragAndDropUploader";
import { useState } from "react";

interface BlogPostAsideProps {
	setThumbnail: (value: File) => void;
	imagesUrl: string[];
	setImagesUrl: (value: string[]) => void;
}

export default function BlogPostAside({
	setThumbnail,
	imagesUrl,
	setImagesUrl,
}: BlogPostAsideProps) {
	const [previewThumbnailUrl, setPreviewThumbnailUrl] = useState("");

	return (
		<aside id="blog-post-aside">
			<section id="featured-image">
				<h3>Featured Image</h3>
				<Divider />
				<Image width={200} src={previewThumbnailUrl} />
				<InputFileUpload
					setThumbnail={setThumbnail}
					setPreviewThumbnail={setPreviewThumbnailUrl}
				/>
			</section>
			<section id="images">
				<h3>Other Images</h3>
				<Divider />
				<PicturesWall />
			</section>
		</aside>
	);
}
