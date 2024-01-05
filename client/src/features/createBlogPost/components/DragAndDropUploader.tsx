import { ChangeEvent } from "react";
import { message } from "antd";

interface InputFileUploadProps {
	setThumbnail: (value: File) => void;
	setPreviewThumbnail: (value: string) => void;
}

export default function InputFileUpload({
	setThumbnail,
	setPreviewThumbnail,
}: InputFileUploadProps) {
	const [messageApi, contextHolder] = message.useMessage();

	const error = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target && e.target.files) {
			if (e.target.files[0].size > 2097152) {
				error("Image too large, max size is 2MB");
				e.target.files = null;
				throw new Error("File size exceeded limit of 2MB");
			}
			setThumbnail(e.target.files[0]);
			const imageUrl = URL.createObjectURL(e.target.files[0]);
			setPreviewThumbnail(imageUrl);
		}
	};

	return (
		<>
			{contextHolder}
			<button>
				<input
					type="file"
					name="image-uploader"
					id="image-uploader"
					multiple={false}
					accept="image/*"
					onChange={(e) => {
						inputChangeHandler(e);
					}}
				/>
			</button>
		</>
	);
}
