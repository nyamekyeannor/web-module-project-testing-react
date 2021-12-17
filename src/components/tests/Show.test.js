import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Show from "./../Show";

const exampleShow = {
  name: "Test Show",
  summary: "Test show summary blah blah blah",
  seasons: [
    { id: 1, name: "Test Season 1", episodes: [] },
    { id: 2, name: "Test Season 2", episodes: [] },
    { id: 3, name: "Test Season 3", episodes: [] },
  ],
};

test("renders without errors", () => {
  render(<Show show={exampleShow} selectedSeason="none" />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} />);

  const loadingComponent = screen.getByTestId("loading-container");

  expect(loadingComponent).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  render(<Show show={exampleShow} selectedSeason="none" />);

  const seasonSelect = screen.getByLabelText(/select a season/i);
  userEvent.click(seasonSelect);
  const seasons = screen.getAllByTestId("season-option");

  expect(seasons).toHaveLength(3);
});

test("handleSelect is called when an season is selected", async () => {
  const handleSelect = jest.fn();

  render(
    <Show
      show={exampleShow}
      selectedSeason="none"
      handleSelect={handleSelect}
    />
  );

  const seasonSelect = screen.getByLabelText(/select a season/i);
  userEvent.selectOptions(seasonSelect, ["2"]);

  expect(handleSelect).toBeCalled();
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  const { rerender } = render(
    <Show show={exampleShow} selectedSeason="none" />
  );

  let episodesComponent = screen.queryByTestId("episodes-container");

  expect(episodesComponent).not.toBeInTheDocument();

  rerender(<Show show={exampleShow} selectedSeason={2} />);

  episodesComponent = screen.queryByTestId("episodes-container");

  expect(episodesComponent).toBeInTheDocument();
});
