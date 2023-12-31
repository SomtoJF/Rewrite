import { gql, useMutation } from "@apollo/client";
import useUserData from "../../../zustand/useUserData";

const MUTATE_PROFILE_PICTURE = gql`
	mutation MutateProfilePicture(
		$updateAccountId: String!
		$edits: UpdateAccountArgs
	) {
		updateAccount(id: $updateAccountId, edits: $edits) {
			profile_picture
		}
	}
`;

type postProfilePictureArgs = {
	edits: {
		profile_picture: string;
	};
};

export default function usePostProfilePicture() {
	const [mutateProfilePicture] = useMutation(MUTATE_PROFILE_PICTURE);
	const id = useUserData((state) => state.userData?.account._id);

	const updateAccountInfo = async ({ edits }: postProfilePictureArgs) => {
		const response = await mutateProfilePicture({
			variables: { updateAccountId: id, edits: edits },
			onError: (err: any) => {
				throw new Error(err);
			},
			onCompleted(data) {
				console.log(data);
			},
		});
		return response;
	};
	return { updateAccountInfo };
}
