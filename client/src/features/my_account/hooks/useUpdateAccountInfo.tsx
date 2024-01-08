import { ApolloError, gql, useMutation } from "@apollo/client";

const MUTATE_PROFILE_PICTURE = gql`
	mutation MutateProfilePicture(
		$updateAccountId: String!
		$edits: UpdateAccountArgs!
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

export default function usePostProfilePicture(
	currentUserId: string | undefined
) {
	const [mutateProfilePicture] = useMutation(MUTATE_PROFILE_PICTURE);

	const updateAccountInfo = async ({ edits }: mutateAccountInfoArgs) => {
		const response = await mutateProfilePicture({
			variables: { updateAccountId: currentUserId, edits: edits },
			onError: (err: ApolloError) => {
				throw new Error(err.message);
			},
			onCompleted(data) {
				console.log(data);
			},
		});
		return response;
	};
	return { updateAccountInfo };
}
