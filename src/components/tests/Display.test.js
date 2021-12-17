import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Display from "./../Display";

import mockFetchShow from "./../../api/fetchShow";
jest.mock("./../../api/fetchShow");

const exampleShow = {
  name: "Test Show",
  summary: "Test show summary blah blah blah",
  seasons: [
    { id: 1, name: "Test Season 1", episodes: [] },
    { id: 2, name: "Test Season 2", episodes: [] },
    { id: 3, name: "Test Season 3", episodes: [] },
  ],
};

test("renders without errors with no props", () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  mockFetchShow.mockResolvedValueOnce(exampleShow);

  render(<Display show={exampleShow} />);

  const button = screen.getByRole("button");
  userEvent.click(button);
  const showComponent = await screen.findByTestId("show-container");

  expect(showComponent).toBeInTheDocument();
});

test("renders show season options matching your data when the button is clicked", async () => {
  mockFetchShow.mockResolvedValueOnce(exampleShow);

  render(<Display />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    const seasons = screen.getAllByTestId("season-option");
    expect(seasons).toHaveLength(3);
  });
});

test("displayFunc is called when the fetch button is pressed", async () => {
  mockFetchShow.mockResolvedValueOnce(exampleShow);

  const displayFunc = jest.fn();

  render(<Display displayFunc={displayFunc} />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  });
});
