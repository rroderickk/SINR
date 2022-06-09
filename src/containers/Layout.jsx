import React from "react";

const styleLayout = {
	textAlign: "center",
	// backgroundColor: "#000",
	backgroundColor: '#EAEBF3',
	minWidth: "350px",
	maxWidth: "100vw",
	minHeight: "100vh",
	padding: "20px",
};

export const Layout = ({ children }) => <>
  <div style={styleLayout}>
    {children}
  </div>
</>
