import { useState } from "react";

const initialState = {
	htmlColection: [],
	colors: {
		primary: '#1976d2',
		crim: '#d32f2f',
	}
};

const useInitialState = () => {
	const [state, setState] = useState(initialState);

	return {
		state,
	};
};
export { useInitialState };
