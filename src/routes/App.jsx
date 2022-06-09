import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "@context/AppContext";
import { useInitialState } from "@hooks/useInitialState";
import { Layout } from "@containers/Layout";
import { Home } from "@pages/home/Home";
import { NodeMachine } from "@pages/nodemachine/NodeMachine";
import { NotFound } from "@pages/notfound/NotFound";

export const App = () => {
	const initialState = useInitialState();

	return (
		<AppContext.Provider value={initialState}>
			<BrowserRouter basename="/SINR">
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/nodemachine" element={<NodeMachine />} />

						{/* //todo [¡¡] InsertRoutes here [!!] */}

						<Route path="*" element={<NotFound />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</AppContext.Provider>
	);
};
