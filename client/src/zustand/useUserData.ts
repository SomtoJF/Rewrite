import { create } from "zustand";

type AccountData = {
	_id: string;
	firstname: string;
	lastname: string;
	profile_picture?: string;
};

interface UserData {
	account: AccountData;
}
interface UserDataState {
	userData: null | UserData;
	setUserData: (data: UserData) => void;
}

const useUserData = create<UserDataState>()((set) => ({
	userData: null,
	setUserData: (data: UserData) => set(() => ({ userData: data })),
}));

export default useUserData;
