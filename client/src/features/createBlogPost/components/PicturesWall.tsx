import { ChangeEvent, useEffect } from "react";
import "./PicturesWall.styles.sass";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Image } from "antd";
import { Badge } from "@mui/material";
import fallback from "../../../lib/fallbackImage";
import CloseIcon from "@mui/icons-material/Close";

export default function PicturesWall() {
	const [previewImagesUrl, setPreviewImagesUrl] = useState<string[]>([]);
	const [images, setImages] = useState<File[]>([]);
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const imageFiles = Array.from(e.target.files);
			setImages(images.concat(imageFiles));
		}
	};
	const deleteImage = (imageIndex: number) => {
		setImages(images.filter((_, index) => index != imageIndex));
	};
	useEffect(() => {
		if (images) {
			const imageUrls = images.map((image) => URL.createObjectURL(image));
			setPreviewImagesUrl(imageUrls);
			console.log(imageUrls, "image urls");
		}
	}, [images]);

	return (
		<div id="pictures-wall">
			<Image.PreviewGroup>
				{previewImagesUrl.map((url, index) => (
					<Badge
						badgeContent={
							<div
								className="cancel-button-container"
								style={{ width: "100%", height: "100%" }}
								onClick={() => {
									deleteImage(index);
								}}
							>
								<CloseIcon style={{ width: 12, height: 12 }} />
							</div>
						}
						color="error"
						sx={{ cursor: "pointer" }}
						key={0.234 + index}
					>
						<Image src={url} fallback={fallback} />
					</Badge>
				))}
			</Image.PreviewGroup>
			<label htmlFor="image-wall-input">
				<PlusOutlined /> <p>Upload</p>
				<input
					type="file"
					name="image-wall-input"
					id="image-wall-input"
					multiple={true}
					accept="image/*"
					onChange={(e) => {
						handleInputChange(e);
					}}
				/>
			</label>
		</div>
	);
}
