import { ReactElement, useState } from "react";
import { Modal } from "antd";

type props = {
	children: ReactElement[];
	open: boolean;
	setOpen: (value: boolean) => void;
	trigger: ReactElement;
	title: string;
	formRef?: HTMLFormElement | any;
};

const MyModal = ({
	children,
	open,
	setOpen,
	trigger,
	title,
	formRef,
}: props) => {
	const [confirmLoading, setConfirmLoading] = useState(false);

	const showModal = () => {
		setOpen(true);
	};

	const handleOk = async () => {
		setConfirmLoading(true);
		await formRef.current.submit();
	};

	const handleCancel = () => {
		setOpen(false);
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
				{children}
			</Modal>
		</>
	);
};

export default MyModal;
