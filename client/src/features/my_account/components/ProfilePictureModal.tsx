import { ChangeEvent, ReactElement, useState } from "react";
import { Modal, Image, message } from "antd";
import usePostProfilePicture from "../../../hooks/useUpdateAccountInfo";
import fallback from "../../../lib/fallbackImage";
import uploadImage from "../../../lib/uploadImage";

type props = {
	open: boolean;
	setOpen: (value: boolean) => void;
	trigger: ReactElement;
	title: string;
	currentUserId: string;
};

const MyModal = ({ open, setOpen, trigger, title, currentUserId }: props) => {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [newDisplayPicture, setNewDisplayPicture] = useState<File>();
	const [previewImageUrl, setPreviewImageUrl] = useState("");
	const [messageApi, contextHolder] = message.useMessage();
	const { updateAccountInfo } = usePostProfilePicture(currentUserId);

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

	const showModal = () => {
		setOpen(true);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const handleOk = async () => {
		setConfirmLoading(true);
		try {
			if (!newDisplayPicture) throw new Error("No image selected");
			const profilePictureCdn = (await uploadImage(newDisplayPicture)).cdnUrl;
			if (!profilePictureCdn) throw new Error("No profile picture");
			await updateAccountInfo({
				edits: { profile_picture: profilePictureCdn },
			});
			success("Upload successful");
			window.location.reload();
		} catch (err: any) {
			error("We couldn't upload your profile picture");
			throw new Error(err.error);
		} finally {
			setConfirmLoading(false);
		}
		setOpen(false);
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target && e.target.files) {
			if (e.target.files[0].size > 2097152) {
				error("Please maintain a file max size of 2MB");
				e.target.files = null;
				throw new Error("File size exceeded limit of 2MB");
			}
			setNewDisplayPicture(e.target.files[0]);
			const imageUrl = URL.createObjectURL(e.target.files[0]);
			setPreviewImageUrl(imageUrl);
		}
	};

	return (
		<>
			{contextHolder}
			<div onClick={showModal}>{trigger}</div>
			<Modal
				title={title}
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				okText="Upload"
			>
				<form action="">
					<Image src={previewImageUrl} fallback={fallback} />
					<input
						type="file"
						name="image"
						id="image"
						accept="image/*"
						multiple={false}
						required
						onChange={(e) => {
							inputChangeHandler(e);
						}}
					/>
				</form>
			</Modal>
		</>
	);
};

export default MyModal;
