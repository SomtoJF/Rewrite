import { useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Input } from "antd";
import { useAuth } from "../../../contexts/authContext";
import usePostProfilePicture from "../../../hooks/useUpdateAccountInfo";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";

interface props {
	bio: string | undefined;
	id: string | undefined;
}

const { TextArea } = Input;

export default function Bio({ bio, id }: props) {
	const [edit, setEdit] = useState(true);
	const { currentUser } = useAuth();
	const currentUserId = currentUser ? currentUser.uid : undefined;
	const [bioInputText, setBioInputText] = useState(bio);
	const { updateAccountInfo } = usePostProfilePicture(currentUserId);
	const [loading, setLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const error = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	const success = (message: string) => {
		messageApi.open({
			type: "success",
			content: message,
		});
	};

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setBioInputText(e.target.value);
	};

	const handleSaveBio = async () => {
		try {
			setLoading(true);
			await updateAccountInfo({ edits: { bio: bioInputText } });
			success("Bio saved successfully");
			setTimeout(() => {
				setEdit(false);
				window.location.reload();
			}, 1000);
		} catch (e: any) {
			error("An error occurred while saving your bio");
			throw new Error(e);
		} finally {
			setEdit(false);
			setLoading(false);
		}
	};

	return (
		<>
			{contextHolder}
			{!edit ? (
				<div
					id="bio"
					onClick={() => {
						currentUserId === id ? setEdit(true) : null;
					}}
				>
					<Markdown
						children={bioInputText}
						rehypePlugins={[rehypeRaw]}
						remarkPlugins={[remarkGfm]}
						className={"bio-markdown-container"}
					/>
				</div>
			) : (
				<>
					<TextArea
						showCount
						count={{ show: true, max: 300 }}
						onChange={onChange}
						placeholder="Let people know who you are"
						value={bioInputText}
						style={{
							height: 120,
							width: "max(25vw,250px)",
							resize: "none",
							display: "block",
						}}
					/>
					<div id="bio-alter-container">
						<button type="button" onClick={handleSaveBio} disabled={loading}>
							{loading ? <LoadingOutlined /> : "Save bio"}
						</button>
						<button
							type="button"
							onClick={() => {
								setEdit(false);
							}}
						>
							Preview
						</button>
						<button
							type="button"
							onClick={() => {
								setBioInputText(bio);
								setEdit(false);
							}}
						>
							Cancel
						</button>
					</div>
				</>
			)}
		</>
	);
}
