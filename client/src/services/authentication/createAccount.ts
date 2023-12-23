import { gql } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
	mutation CreateAccountMutation($account: CreateAccountArgs!) {
		createAccount(account: $account) {
			firstname
			lastname
		}
	}
`;

export default CREATE_ACCOUNT_MUTATION;
