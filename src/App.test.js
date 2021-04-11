import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("render without crashing", async () => {
  const { findByText } = render(<App />);
  const linkElement = await findByText(/Última Búsqueda/i);
  expect(linkElement).toBeInTheDocument();
});
