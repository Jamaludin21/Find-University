/* eslint-disable no-undef */
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

const url = "http://universities.hipolabs.com/search?country=";
const mockFetch = async () => {
  if (url) {
    const universities = [
      {
        name: "AKAD Hochschulen für Berufstätige, Fachhochschule Leipzig",
        country: "Germany",
        web_pages: ["http://www.akad.de/"],
      },
      {
        name: "Alice-Salomon-Fachhochschule für Sozialarbeit und Sozialpädagogik Berlin",
        country: "Germany",
        web_pages: ["http://www.asfh-berlin.de/"],
      },
    ];

    return {
      ok: true,
      json: async () => universities,
    };
  }

  return {
    ok: false,
  };
};

global.fetch = jest.fn().mockImplementation(mockFetch);

test("fetches and displays universities", async () => {
  render(<App />);

  await waitFor(() => {
    expect(
      screen.getByText(
        "AKAD Hochschulen für Berufstätige, Fachhochschule Leipzig",
        { exact: false }
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Alice-Salomon-Fachhochschule für Sozialarbeit und Sozialpädagogik Berlin",
        { exact: false }
      )
    ).toBeInTheDocument();
  });
});
