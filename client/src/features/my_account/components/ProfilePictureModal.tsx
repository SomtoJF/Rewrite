import { ChangeEvent, ReactElement, useState } from "react";
import { Modal, Image } from "antd";
import { UploadClient } from "@uploadcare/upload-client";
import { useSnackbar } from "notistack";

type props = {
	open: boolean;
	setOpen: (value: boolean) => void;
	trigger: ReactElement;
	title: string;
};

const client = new UploadClient({
	publicKey: import.meta.env.VITE_REACT_APP_UPLOADCARE_KEY,
});

const MyModal = ({ open, setOpen, trigger, title }: props) => {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [newDisplayPicture, setNewDisplayPicture] = useState<File>();
	const [newImageUrl, setNewImageUrl] = useState("");
	const { enqueueSnackbar } = useSnackbar();

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
			const response = await client.uploadFile(newDisplayPicture);
			console.log(response.cdnUrl);
			enqueueSnackbar("Upload successful", { variant: "success" });
		} catch (err: any) {
			enqueueSnackbar("We couldn't upload your profile picture", {
				variant: "error",
			});
			throw new Error(err.error);
		} finally {
			setConfirmLoading(false);
		}
		setOpen(false);
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target && e.target.files) {
			setNewDisplayPicture(e.target.files[0]);
			console.log(e.target.files);
			const imageUrl = URL.createObjectURL(e.target.files[0]);
			setNewImageUrl(imageUrl);
			console.log(imageUrl);
		}
	};

	return (
		<>
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
					<Image src={newImageUrl} />
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
