/* eslint-disable no-undef */
// src/components/Universities.test.js
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Universities from "./Universities";

jest.mock("axios");

test("fetches and displays universities", async () => {
  const universities = [
    {
      name: "Harvard University",
      country: "United States",
      web_pages: ["http://www.harvard.edu"],
    },
    {
      name: "Stanford University",
      country: "United States",
      web_pages: ["http://www.stanford.edu"],
    },
  ];

  axios.get.mockResolvedValue({ data: universities });

  render(<Universities country="United States" />);

  await waitFor(() =>
    expect(screen.getByText("Harvard University")).toBeInTheDocument()
  );
  expect(screen.getByText("Stanford University")).toBeInTheDocument();
});
