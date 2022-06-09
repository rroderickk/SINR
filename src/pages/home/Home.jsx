import React, { useContext } from "react";
import { AppContext } from "@context/AppContext";

export const Home = () => {
	const { state } = useContext(AppContext);

	return <>
		<h1 style={{ color: "#333" }}>Home</h1>
		<h1 style={{ color: state.colors.crim }}>Home</h1>
	</>
};
