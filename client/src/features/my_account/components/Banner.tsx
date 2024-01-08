import { useState, ChangeEvent } from "react";
import { CameraOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import "./Banner.styles.sass";
import { useParams } from "react-router-dom";
import uploadImage from "../../../lib/uploadImage";
import usePostProfilePicture from "../hooks/useUpdateAccountInfo";

interface PropsInterface {
	banner_picture: string | undefined;
	currentUserId: string | undefined;
}

export default function Banner({
	banner_picture,
	currentUserId,
}: PropsInterface) {
	const [displayBannerInput, setDisplayBannerInput] = useState(false);
	const [localBannerPicture, setLocalBannerPicture] = useState(false);
	const [displayedBannerPicture, setDisplayedBannerPicture] =
		useState(banner_picture);
	const [newBannerFile, setNewBannerFile] = useState<File>();
	const [messageApi, contextHolder] = message.useMessage();
	const { updateAccountInfo } = usePostProfilePicture(currentUserId);
	const [loading, setLoading] = useState(false);
	const { id } = useParams();

	const success = (text: string) => {
		messageApi.open({
			type: "success",
			content: text,
		});
	};

	const error = (text: string) => {
		messageApi.open({
			type: "error",
			content: text,
		});
	};

	const handleBannerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) throw new Error("There is no file to be displayed.");
		if (e.target.files[0].size > 2097152) {
			error("Please maintain a file max size of 2MB");
			e.target.files = null;
			throw new Error("File size exceeded limit of 2MB");
		}
		setNewBannerFile(e.target.files[0]);
		setDisplayedBannerPicture(URL.createObjectURL(e.target.files[0]));
		setLocalBannerPicture(true);
		messageApi.info("Hover on the banner to reveal the Upload/cancel buttons");
	};

	const handleUploadBanner = async () => {
		try {
			setLoading(true);
			if (newBannerFile) {
				const response = await uploadImage(newBannerFile);
				const cdn = response.cdnUrl!;
				await updateAccountInfo({ edits: { banner_picture: cdn } });
				setDisplayedBannerPicture(cdn);
				setLocalBannerPicture(false);
				success("Upload Successful");
			}
		} catch (e: any) {
			error("We could not upload your new banner");
			throw new Error(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{contextHolder}
			<div
				id="banner-container"
				style={{ backgroundImage: `url(${displayedBannerPicture})` }}
				onMouseEnter={() => {
					setDisplayBannerInput(true);
				}}
				onMouseLeave={() => {
					setDisplayBannerInput(false);
				}}
			>
				{displayBannerInput && currentUserId === id && (
					<>
						<label htmlFor="banner-input">
							<CameraOutlined
								style={{
									mixBlendMode: "difference",
									position: "relative",
									filter: "invert(100%)",
								}}
							/>
							{localBannerPicture && (
								<div>
									<Button
										type="primary"
										onClick={handleUploadBanner}
										loading={loading}
									>
										Upload
									</Button>
									<Button
										type="primary"
										danger
										onClick={() => {
											setDisplayedBannerPicture(banner_picture);
											setLocalBannerPicture(false);
										}}
									>
										Cancel
									</Button>
								</div>
							)}
						</label>
						<input
							type="file"
							id="banner-input"
							name="banner-picture-input"
							multiple={false}
							onChange={handleBannerOnChange}
						/>
					</>
				)}
			</div>
		</>
	);
}
