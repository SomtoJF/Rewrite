import Hero from "../features/my_account/components/Hero";
import MyArticles from "../features/my_account/components/MyArticles";
import useUserData from "../zustand/useUserData";

export default function Account() {
	const userData = useUserData((state) => state.userData);
	if (userData) {
		return (
			<main className="page">
				<Hero
					firstname={userData?.account.firstname}
					lastname={userData?.account.lastname}
					profile_picture={userData?.account.profile_picture}
				/>
				<MyArticles id={userData!.account._id} />
			</main>
		);
	}
}
