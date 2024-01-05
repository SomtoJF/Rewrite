import { ChangeEvent } from "react";
import "./PicturesWall.styles.sass";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { message } from "antd";
import { Badge } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import uploadImage from "../../../lib/uploadImage";

export default function PicturesWall() {
	const [previewImagesUrl, setPreviewImagesUrl] = useState<string[]>([]);
	const [images, setImages] = useState<File[]>([]);
	const [messageApi, contextHolder] = message.useMessage();
	const [loading, setLoading] = useState(false);

	const success = (message: string) => {
		messageApi.open({
			type: "success",
			content: message,
		});
	};

	const error = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
		setLoading(true);
		if (e.target.files && e.target.files.length > 0) {
			const imageFile = e.target.files[0];
			try {
				const response = await uploadImage(imageFile);
				if (response.cdnUrl) {
					setPreviewImagesUrl(previewImagesUrl.concat(response.cdnUrl));
					setImages(images.concat(imageFile));
				}
				success("image successfully uploaded");
			} catch (err: any) {
				error("An error occured while uploading the image");
				throw new Error(err);
			} finally {
				setLoading(false);
			}
		}
	};
	const deleteImage = (imageIndex: number) => {
		setImages(images.filter((_, index) => index != imageIndex));
		setPreviewImagesUrl(
			previewImagesUrl.filter((_, index) => index != imageIndex)
		);
	};

	return (
		<>
			{contextHolder}
			<div id="pictures-wall">
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
						<figure
							onClick={() => {
								try {
									navigator.clipboard.writeText(previewImagesUrl[index]);
									success("image url copied to clipboard");
								} catch (e: any) {
									error("The image couldn't be copied");
									throw new Error(e);
								}
							}}
						>
							<img src={url} alt={url} />
						</figure>
					</Badge>
				))}

				<label htmlFor="image-wall-input">
					{loading ? (
						<LoadingOutlined />
					) : (
						<>
							<PlusOutlined /> <p>Upload</p>
						</>
					)}

					<input
						type="file"
						name="image-wall-input"
						id="image-wall-input"
						multiple={false}
						accept="image/*"
						onChange={(e) => {
							handleInputChange(e);
						}}
					/>
				</label>
			</div>
		</>
	);
}
