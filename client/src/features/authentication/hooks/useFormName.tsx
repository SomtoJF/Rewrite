import { create } from "zustand";

interface FormNameState {
	activeFormName: "login" | "signup";
	setActiveFormName: (name: "login" | "signup") => void;
}

const useFormName = create<FormNameState>()((set) => ({
	activeFormName: "login",
	setActiveFormName: (name: "login" | "signup") =>
		set(() => ({ activeFormName: name })),
}));

export default useFormName;
