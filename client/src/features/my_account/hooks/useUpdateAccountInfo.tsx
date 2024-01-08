import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../../../contexts/authContext";

const MUTATE_PROFILE_PICTURE = gql`
	mutation MutateProfilePicture(
		$updateAccountId: String!
		$edits: UpdateAccountArgs
	) {
		updateAccount(id: $updateAccountId, edits: $edits) {
			profile_picture
			banner_picture
		}
	}
`;

type mutateAccountInfoArgs = {
	edits: {
		profile_picture?: string;
		banner_picture?: string;
	};
};

export default function usePostProfilePicture() {
	const [mutateProfilePicture] = useMutation(MUTATE_PROFILE_PICTURE);
	const { currentUser } = useAuth();
	const id = currentUser.uid;

	const updateAccountInfo = async ({ edits }: mutateAccountInfoArgs) => {
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
